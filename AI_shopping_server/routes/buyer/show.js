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

function Review() {
  this.userName;
  this.productStars;
  this.productReview;
}


router.get('/', (req, res) => {
	if(typeof req.session.userNum == "undefined") {
		req.session.userNum = "1";
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

	let results1 = client.query('select * from t2_userLog where userNum=' + req.session.userNum + ' and productNum=' + req.query.productNum);
	if(results1.length == 0) {
		let results2 = client.query('insert into t2_userLog values('+ req.session.userNum + ', ' + req.query.productNum + ', 1, sysdate())');
	}
	else {
		let temp = results1[0].visitCount + 1;
		let result4 = client.query('update t2_userLog set visitcount=' + temp + ' where userNum=' + req.session.userNum + ' and productNum=' + req.query.productNum);
	}

  let result1 = client.query('select * from t2_product, t2_user where productNum=' + req.query.productNum + ' and t2_product.userNum=t2_user.userNum');

  let productNum = result1[0].productNum;
  let productImage = result1[0].productImage;
  let productName = result1[0].productName;
  let productCategory = result1[0].productCategory;
  let productPrice = result1[0].productPrice;
  let productText = result1[0].productText;
  let userName = result1[0].userName;

	let myName = req.session.userName;

	let result3 = client.query('select * from t2_product, t2_detailProduct where t2_product.productNum=t2_detailProduct.productNum and t2_product.productNum=' + req.query.productNum);
	let detail = [];
	for(let i = 0; i < result3.length; i++) {
		detail[i] = result3[i].detailImage;
	}

  let result2 = client.query('select * from t2_user, t2_review where t2_user.userNum=t2_review.userNum and productNum=' + req.query.productNum);


  let reviewName = [];
  let reviewStars = [];
  let reviewReview = [];

  let count = 0;

  for(let i = 0; i < result2.length; i++) {
    let userName = result2[i].userName;
    let productStars = result2[i].productStars;
    let productReview = result2[i].productReview;
    

    reviewName[i] = userName;
    reviewStars[i] = productStars;
    reviewReview[i] = productReview;
  }

  console.log(reviewName);
  console.log(reviewStars);
  console.log(reviewReview);

	let title = 'product-detail';
	let msg=''

  res.render(title, {
			title: title,
			msg: msg,
      productNum: productNum,
      productImage: productImage,
      productName: productName,
      productCategory: productCategory,
      productPrice: productPrice,
      productText: productText,
      uN: userName,
      reviewName: reviewName,
      reviewStars: reviewStars,
      reviewReview: reviewReview,
      userNum: req.session.userNum,
      userName: req.session.userName,
			myName: myName,
			userAuth: req.session.userAuth,
			detailImage: detail
    });
	});


module.exports = router;
