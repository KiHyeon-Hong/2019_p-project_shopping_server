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
	let title = 'review-show';
	let msg = '';

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

		if(req.session.userAuth != '2' && req.session.userAuth !='0' ){
			res.render('errorpage',{title:'error', msg: 'permission denied'})
			return ;
		}

  let result = client.query('select userName, t2_user.userNum, productStars, productReview from t2_user, t2_review, t2_product where t2_product.productNum=t2_review.productNum and t2_user.userNum=t2_review.userNum and t2_product.productNum=' + req.query.productNum);
	let result1 = client.query('select * from t2_product where productNum=' + req.query.productNum);
  let reviewName = [];
  let reviewStars = [];
  let reviewReview = [];
  let userNums = [];
	let productName = [];

	productName[0] = result1[0].productName;

  let count = 0;

  for(let i = 0; i < result.length; i++) {
    let userName = result[i].userName;
    let productStars = result[i].productStars;
    let productReview = result[i].productReview;
	let userNum = result[i].userNum;
	console.log("왜?"+userNum)

    reviewName[i] = userName;
    reviewStars[i] = productStars;
    reviewReview[i] = productReview;
    userNums[i] = userNum;
  }

  console.log("누구꺼?"+reviewName);
  console.log(reviewStars);
  console.log(reviewReview);
  console.log("누구꺼?"+userNums);

	res.render(title,
		{
			title: title,
			msg: msg,
			userNum: req.session.userNum,
			userPass: req.session.userPass,
			userName: req.session.userName,
			userPhone: req.session.userPhone,
			userAddr: req.session.userAddr,
			userAccount: req.session.userAccount,
			userSex: req.session.userSex,
			userAuth: req.session.userAuth,
			userBirth: req.session.userBirth,
			productNum: req.query.productNum,
      reviewName: reviewName,
      reviewStars: reviewStars,
      reviewReview: reviewReview,
      reviewuserNum: userNums,
			productName: productName[0]
		});


});

router.post('/', (req, res) => {
});


module.exports = router;
