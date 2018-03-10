var express = require('express');
var router = express.Router();
var Paper = require('./Models/Paper');

router.get('/:id?', function (req, res, next) {
    if (req.params.id) {
        Paper.getPaperById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.send(rows);
            }
        });
    } else {
        Paper.getAllPaper(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.send(rows);
            }
        });
    }
});

router.post('/',function(req,res,next){
    Paper.addPaper(req.query,function(err,count){
        if(err){
            res.json(err);
        } else{
            res.json(req.query);
        }
    });
});

router.put('/:id', function (req, res, next) {
    Paper.updatePaper(req.params.id, req.query, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;