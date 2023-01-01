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
	let title = 'shop-grid';
	let msg = '';
	if (typeof req.session.userNum == "undefined") {
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

	let category = req.query.category;
	console.log("0!" + category);
	let product_result = client.query('select * from t2_product where productCategory="' + category + '" and productCheck=1');
	console.log("1!" + product_result);

	let result1 = client.query('select productNum, avg(productStars) as avg from t2_review group by productNum');

	let productNum = [];
	for (let i = 0; i < product_result.length; i++) {
		productNum[i] = product_result[i].productNum;
	}

	let stars = [];

	for (let i = 0; i < product_result.length; i++) {
		stars[i] = 0;
		for (let j = 0; j < result1.length; j++) {
			if (productNum[i] == result1[j].productNum) {
				stars[i] = result1[j].avg;
				break;
			}
		}
	}

	res.render(title,
		{
			title: category + ' 상품',
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
			product: product_result,
			stars: stars
		});

});

module.exports = router;
