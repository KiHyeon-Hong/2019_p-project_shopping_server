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
	let title = 'main';
	let msg = '';
	let userNum = req.session.userNum;
	if(typeof req.session.userNum == "undefined" || req.session.userNum == "") {
       req.session.userNum = 1;
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
  console.log("0!"+userNum);

	let result = client.query('select * from t2_product where adminCheck!=0 order by adminCheck asc');
  let product_result = client.query('select * from t2_product, t2_userLog where t2_userLog.userNum=' + req.session.userNum + ' and t2_product.productNum=t2_userLog.productNum order by visitCount desc');

	let productNum = [];
	let productImage = [];
	let productName = [];
	let productCategory = [];
	let productPrice = [];
	let productDetail = [];
	let productText = [];
	let productCheck = [];
	let adminCheck = [];

	for(let i = 0; i < result.length; i++) {
		productNum[i] = result[i].productNum;
		productImage[i] = result[i].productImage;
		productName[i] = result[i].productName;
		productCategory[i] = result[i].productCategory;
		productPrice[i] = result[i].productPrice;
		productDetail[i] = result[i].productDetail;
		productText[i] = result[i].productText;
		productCheck[i] = result[i].productCheck;
		adminCheck[i] = result[i].adminCheck;
	}

	for(let i = 0; i < product_result.length; i++) {
		if(req.session.userNum == "1") {
			break;
		}
		else {
			productNum[result.length + i] = product_result[i].productNum;
			productImage[result.length + i] = product_result[i].productImage;
			productName[result.length + i] = product_result[i].productName;
			productCategory[result.length + i] = product_result[i].productCategory;
			productPrice[result.length + i] = product_result[i].productPrice;
			productDetail[result.length + i] = product_result[i].productDetail;
			productText[result.length + i] = product_result[i].productText;
			productCheck[result.length + i] = product_result[i].productCheck;
			adminCheck[result.length + i] = product_result[i].adminCheck;
		}
	}

	console.log(productNum);


	let result1 = client.query('select productNum, avg(productStars) as avg from t2_review group by productNum');

	let stars = [];

	for(let i = 0; i < (result.length + product_result.length); i++) {
		stars[i] = 0;
		for(let j = 0; j < result1.length; j++) {
				if(productNum[i] == result1[j].productNum) {
					stars[i] = result1[j].avg;
					break;
				}
		}
	}

	console.log(stars);
	let data = fs.readFileSync('./routes/admin/bg.txt', 'utf-8');
	console.log(data);
	let bg = String(data).split('/');

	for(let i=0;i<bg.length;i++){
		console.log(bg[i]);
	}

	fs.readFile('./routes/admin/nameInfo.txt', 'utf8', (err, name) => {
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
				productNum: productNum,
				productImage: productImage,
				productName: productName,
				productCategory: productCategory,
				productPrice: productPrice,
				productDetail: productDetail,
				productText: productText,
				productCheck: productCheck,
				adminCheck: adminCheck,
				stars: stars,
				bg: bg,
				name: name
			});
	});
});

module.exports = router;
