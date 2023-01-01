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

  console.log('login');
	let title = 'login'
	let msg = ''
	let userName = req.session.userName;

	console.log(userName)

	res.render(title,
		{
			title: title,
			msg: msg,
			userName: userName,
			userAuth: req.session.userAuth
		});

});

router.post('/', (req, res) => {
	let results = client.query('select * from t2_user');
	var userId = "", userPass = "";
	userId = req.body.userId;
	userPass = req.body.userPass;

	for(let i = 0; i < results.length; i++) {
		if(userId == results[i].userId && userPass == results[i].userPass) {
			if(results[i].userAuth == "3") {
				res.redirect('/src/userManagement/login');
			}
			else {
				req.session.userNum = results[i].userNum;
				req.session.userId = results[i].userId;
				req.session.userPass = results[i].userPass;
				req.session.userName = results[i].userName;
				req.session.userPhone = results[i].userPhone;
				req.session.userAddr = results[i].userAddr;
				req.session.userAccount = results[i].userAccount;
				req.session.userSex = results[i].userSex;
				req.session.userAuth = results[i].userAuth;
				req.session.userBirth = results[i].userBirth;

				

				switch (req.session.userAuth) {
					
					case 0:
						res.redirect('/src/admin/index');
						break;
					case 1:
						res.redirect('/src/buyer/index');
						break;
					case 2:
						res.redirect('/src/productManagement/productList');
						break;
					default:

				}
				return;
			}
			
		}
		else if(i == results.length - 1) {
			console.log("로그인 실패")

			let title = 'login'
			let msg = '로그인에 실패 하였습니다.'

			res.render(title,
				{
					title: title,
					msg: msg
				});
		}
	}
});


module.exports = router;
