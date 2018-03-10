var db = require('../Dbconnection');

var Paper = {
	getAllPaper: function (callback) {
		return db.query("Select * from tbl_paper", callback);
	},

	getPaperById: function (id, callback) {
		return db.query("select * from tbl_paper where ID=?", [id], callback);
	},

	addPaper: function (paper, callback) {
		return db.query("Insert into tbl_paper(Code,Company,Price,Volume, Value) values(?,?,?,?,?)", 
		[paper.Code, paper.Company, paper.Price, paper.Volume, paper.Value], callback);
	},
	
	updatePaper: function (id, paper, callback) {
		return db.query("update tbl_paper set Price=? where ID=?", [paper.Price, id], callback);
	}
};
module.exports = Paper;