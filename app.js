var express = require('express');
var bodyparser = require('body-parser');
var CronJob = require('cron').CronJob;

var connection = require('./Dbconnection');
var routes = require('./routes');

var app = express();
app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyparser.json());

app.use('/api/paper', routes);

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index.ejs");
});

// ***********START CRONJOB*****************
var job = new CronJob({
  cronTime: '00 00 00 * * *',
  onTick: function () {
    connection.getConnection(function (objErr, objConn) {
      if (objErr) {
        console.log('ERROR');
      } else {
        objConn.query("SELECT * FROM tbl_paper", function (Err, Rows, Fields) {
          for (var i = 0; i < Rows.length; i++) {
            console.log(Rows[i].ID);
            connection.query("update tbl_paper set OldPrice =? where ID=?", [Rows[i].Price, Rows[i].ID]);
          }
        });
      }
    });
  },
  start: false,
  timeZone: 'Asia/Ho_Chi_Minh'
});
job.start();
// **************END CRONJOB**************

function randomVolume(volume) {
  return volume + Math.floor(10 + Math.random() * (30 + 1 - 10));
}

function randomPrice(price) {
  let min = -price * 5 / 100;
  let max = price * 5 / 100;
  // console.log(max);
  // console.log(min);
  // console.log(parseFloat(min + Math.random() * (max + 1 - min)).toFixed(2));
  return price + Math.floor(min + Math.random() * (max + 1 - min));
}

updateDb = function () {
  connection.getConnection(function (objErr, objConn) {
    if (objErr) {
      console.log('ERROR');
    } else {
      objConn.query("SELECT * FROM tbl_paper", function (Err, Rows, Fields) {
        for (var i = 0; i < Rows.length; i++) {
          let volume = randomVolume(Rows[i].Volume);
          let price = randomPrice(Rows[i].Price);
          connection.query("update tbl_paper set Price=?,Volume=? where ID=?", [price,volume, Rows[i].ID]);
        }
      });
    }
  });
}
updateDb();
setInterval(function(){updateDb();},5000);

var server = app.listen(3000, function () {
  console.log('Server listening on port ' + server.address().port);
});

module.exports = app;
