const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('sync-mysql');
const multer = require('multer');
const path = require('path');
const router = express.Router();
let productNum = 0;
let mypath = path.resolve('./public/images');
let ext = "";
let productImage = "";
var client = new mysql({
	host: 'localhost',
	user: '2019pprj',
	password: 'pprj2019',
	database: 'db2019'
});
let fields = "";
let field = [];
let detailImage = [];
let i = 0;
var upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			fields = file.fieldname;
			field = fields.split('_');
			console.log("1!" + field[0]);
			cb(null, mypath + "/" + field[0]);
		},
		filename(req, file, cb) {
			console.log(file.originalname);
			ext = path.extname(file.originalname);
			console.log("2!" + ext);
			if(fields == 'main'){
				let dbpath = "/product" + productNum + ext;
				productImage = "product" + productNum + ext;
				console.log("3!" + mypath + "/" + field[0]+dbpath);
				cb(null, dbpath);
			}
			else{
				let dbpath = "/product" + productNum +'_'+field[1] + ext;
				detailImage[i++] = 'product'+productNum+'_'+field[1]+ext;
				console.log("3!" + mypath + dbpath);
				cb(null, dbpath);
			}

		}
	})
});

router.get('/', (req, res) => {
	let title = 'product-add';
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
	
	if (req.session.userAuth != '2') {
		res.render('errorpage', { title: 'error', msg: 'permission denied' })
		return;
	}

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

		});

	let productNum_result = client.query('select count(productNum) as count from t2_product');
	productNum = productNum_result[0].count;
	console.log("0!" + productNum);

});

router.post('/', upload.fields([{ name: 'main', maxCount: 1 }, { name: 'detail_0', maxCount: 1 },{ name: 'detail_1', maxCount: 1 },{ name: 'detail_2', maxCount: 1 },{ name: 'detail_3', maxCount: 1 }]), (req, res) => {
	let productName = req.body.productName;
	let productImage = "product" + productNum + ext;
	let productCategory = req.body.productCategory;
	let productPrice = parseInt(req.body.productPrice);
	
	let productText = req.body.productText;
	let userNum = req.session.userNum;
	let productCheck = 0;
	let adminCheck = 0;
	console.log("3.5" + productNum + productName + productImage + productCategory + productPrice + productText + userNum + productCheck);
	client.query('insert into t2_product values(?,?,?,?,?,?,?,?,?)', [productNum, productImage, productName, productCategory, productPrice, productText, userNum, productCheck,adminCheck]);
	for(let j=0;j<detailImage.length;j++){
		client.query('insert into t2_detailProduct values(?,?)', [productNum, detailImage[j]]);
	}

	
	res.redirect('/src/productManagement/productList');
});


module.exports = router;
