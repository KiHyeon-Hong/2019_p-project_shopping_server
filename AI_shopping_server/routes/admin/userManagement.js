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
	if(req.session.userAuth != '0' ){
		res.render('errorpage',{title:'error', msg: 'permission denied'})
		return ;
	}

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

  let result = client.query('select * from t2_user where userAuth=1');

  let userNum = [];
  let userName = [];
  let userId = [];
  let userPhone = [];
  let userAddr = [];
  let userAccount = [];
  let userSex = [];
  let userAuth = [];
  let userBirth = [];

  for(let i = 0; i < result.length; i++) {
    userNum[i] = result[i].userNum,
    userName[i] = result[i].userName,
    userId[i] = result[i].userId,
    userPhone[i] = result[i].userPhone,
    userAddr[i] = result[i].userAddr,
    userAccount[i] = result[i].userAccount,
    userSex[i] = result[i].userSex,
    userAuth[i] = result[i].userAuth,
    userBirth[i] = result[i].userBirth
  }
	console.log(userNum);

	let title = 'admin-user-list'
	let msg = ''
	let page = req.query.page;
	if(typeof page == "undefined") {
		page = 1;
	}

	res.render(title,
		{
				title: title,
				msg: msg,
				userNum: req.session.userNum,
				userId: req.session.userId,
				userPass: req.session.userPass,
				userName: req.session.userName,
				userPhone: req.session.userPhone,
				userAddr: req.session.userAddr,
				userAccount: req.session.userAccount,
				userSex: req.session.userSex,
				userAuth: req.session.userAuth,
				userBirth: req.session.userBirth,
				user: result,
				page: page
		});

});

router.get('/detail', (req, res) => {
	if(req.session.userAuth != '0' ){
		res.render('errorpage',{title:'error', msg: 'permission denied'})
		return ;
	}

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

	if(req.session.userAuth != '0' ){
		res.render('errorpage',{title:'error', msg: 'permission denied'})
		return ;
	}

	let result1 = client.query('select * from t2_delivery, t2_deliverySet, t2_product where t2_delivery.deliveryNum=t2_deliverySet.deliveryNum and t2_product.productNum=t2_deliverySet.productNum and t2_delivery.userNum=' + req.query.userNum+' order by t2_deliverySet.deliveryNum');

	let deliveryNum = [];
	let deliveryDate = [];
	let deliveryPrice = [];
	let productImage = [];
	let productNum = [];
	let productName = [];
	let productCount = [];
	let deliveryState = [];

	for(let i = 0; i < result1.length; i++) {
		deliveryNum[i] = result1[i].deliveryNum;
		deliveryDate[i] = result1[i].deliveryDate;
		deliveryPrice[i] = result1[i].deliveryPrice;
		productImage[i] = result1[i].productImage;
		productNum[i] = result1[i].productNum;
		productName[i] = result1[i].productName;
		productCount[i] = result1[i].productCount;
		deliveryState[i] = result1[i].deliveryState;
	}

  let result2 = client.query('select * from t2_user where userNum='+ req.query.userNum);

  let userNum = [];
  let userName = [];
  let userId = [];
  let userPhone = [];
  let userAddr = [];
  let userAccount = [];
  let userSex = [];
  let userAuth = [];
  let userBirth = [];

  for(let i = 0; i < result2.length; i++) {
    userNum[i] = result2[i].userNum,
    userName[i] = result2[i].userName,
    userId[i] = result2[i].userId,
    userPhone[i] = result2[i].userPhone,
    userAddr[i] = result2[i].userAddr,
    userAccount[i] = result2[i].userAccount,
    userSex[i] = result2[i].userSex,
    userAuth[i] = result2[i].userAuth,
    userBirth[i] = result2[i].userBirth
  }

	let title = 'admin-buyer-detail'
	let msg = ''
	let page = req.query.page;
	if(typeof page == "undefined") {
		page = 1;
	}

	res.render(title,
		{
				title: title,
				msg: msg,
				userNum: userNum,
				userId: userId,
				userName: userName,
				userPhone: userPhone,
				userAddr: userAddr,
				userAccount: userAccount,
				userSex: userSex,
				userAuth: req.session.userAuth,
				userBirth: userBirth,

				deliveryNum: deliveryNum,
				deliveryDate: deliveryDate,
				deliveryPrice: deliveryPrice,
				productImage: productImage,
				productNum: productNum,
				productName: productName,
				productCount: productCount,
				deliveryState: deliveryState,
				page: page
		});

});

router.get('/delete', (req, res) => {
	if(req.session.userAuth != '0' ){
		res.render('errorpage',{title:'error', msg: 'permission denied'})
		return ;
	}

	let result = client.query('update t2_user set userAuth=3 where userNum='+req.query.userNum);

	res.redirect('/src/admin/userManagement');
});

module.exports = router;
