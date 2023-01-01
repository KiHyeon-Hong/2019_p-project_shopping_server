const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('sync-mysql');

const router = express.Router();

var client = new mysql({
	host: 'localhost',
	user: '2019pprj',
	password: 'pprj2019',
	database: 'db2019'
});

router.get('/', (req, res) => {
	if(typeof req.session.userNum == "undefined") {
		req.session.userNum = "";
		req.session.userId = "";
		req.session.userPass = "";
		req.session.userName = "";
		req.session.userPhone = "";
		req.session.userAddr = "";
		req.session.userAccount = "";
		req.session.userSex = "";
		req.session.userAuth = "";
		req.session.userBirth = "";
	}

	if(req.session.userAuth != '1' ){
		res.render('errorpage',{title:'error', msg: 'permission denied'})
		return ;
	}
  let userNum = req.query.userNum;
  let productNum = req.query.productNum;

	let result = client.query('select * from t2_review where userNum=' + userNum + ' and productNum=' + productNum);

  let reviewStars = result[0].productStars;
  let reviewReview = result[0].productReview;

  console.log(reviewStars + '   ' + reviewReview);
});

router.post('/', (req, res) => {

});


module.exports = router;
