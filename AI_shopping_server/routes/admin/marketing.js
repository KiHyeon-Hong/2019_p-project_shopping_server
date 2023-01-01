const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('sync-mysql');
const request = require('request');
const router = express.Router();

var client = new mysql({
	host: 'localhost',
	user: '2019pprj',
	password: 'pprj2019',
	database: 'db2019'
});

router.get('/', (req, res) => {
    let title = 'admin-ratios';
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
  	if(req.session.userAuth != '0' ){
  		res.render('errorpage',{title:'error', msg: 'permission denied'})
  		return ;
  	}

		let result = client.query('select * from t2_user');
		let result1 = client.query('select t2_product.productNum, productName, productImage, sum(visitCount) as visit from t2_userLog, t2_product where t2_product.productNum=t2_userLog.productNum group by t2_product.productNum, productName, productImage order by sum(visitCount) desc');


		let userSex = [0, 0];
		let userAuth = [0, 0];
		let userBirth = [0, 0, 0, 0, 0, 0, 0];

		let productNum = [];
		let productName = [];
		let productImage = [];
		let visitCount = [];

		for(let i = 0; i < result.length; i++) {
			if(result[i].userSex == "0") {
				userSex[0] = userSex[0] + 1;
			}
			else {
				userSex[1] = userSex[1] + 1;
			}
		}

		for(let i = 0; i < result.length; i++) {
			if(result[i].userAuth == "1") {
				userAuth[0] = userAuth[0] + 1;
			}
			else if(result[i].userAuth == "2"){
				userAuth[1] = userAuth[1] + 1;
			}
		}

		for(let i = 0; i < result.length; i++) {
			let temp = result[i].userBirth.split('-');
			let year = new Date().getFullYear();
			if(year - temp[0] + 1 > 60) {
				userBirth[6] = userBirth[6] + 1;
			}
			else if(year - temp[0] + 1 > 50) {
				userBirth[5] = userBirth[5] + 1;
			}
			else if(year - temp[0] + 1 > 40) {
				userBirth[4] = userBirth[4] + 1;
			}
			else if(year - temp[0] + 1 > 30) {
				userBirth[3] = userBirth[3] + 1;
			}
			else if(year - temp[0] + 1 > 20) {
				userBirth[2] = userBirth[2] + 1;
			}
			else if(year - temp[0] + 1 > 10) {
				userBirth[1] = userBirth[1] + 1;
			}
			else if(year - temp[0] + 1 > 0) {
				userBirth[0] = userBirth[0] + 1;
			}
		}

		for(let i = 0; i < 3; i++) {
			productNum[i] = result1[i].productNum;
			productName[i] = result1[i].productName;
			productImage[i] = result1[i].productImage;
			visitCount[i] = result1[i].visit;
		}

		console.log(userSex);
		console.log(userAuth);
		console.log(userBirth);

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
			genderdata: userSex,
			typedata: userAuth,
			agedata: userBirth,

			productNum: productNum,
			productName: productName,
			productImage: productImage,
			visitCount: visitCount
  	});
});

router.get('/popular', (req, res) => {
    let title = ' ';
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
  		if(req.session.userAuth != '0' ){
  			res.render('errorpage',{title:'error', msg: 'permission denied'})
  			return ;
  		}

  request({
    uri : 'http://192.9.113.167:8080/', 
    method : "GET"
  },(error,res,body)=>{
    console.log(body);
  let result =  JSON.parse(body); 
  console.log('result');
});
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
    result: result
  });
});

module.exports = router;
