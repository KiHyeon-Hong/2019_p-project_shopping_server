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


		let title = 'register'
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
	let userId = "", userPass = "", userName = "", userPhone = "", userAddr = "", userAccount = "", userSex = "", userAuth = "", userBirth = "";
	userId = req.body.userId;
	userPass = req.body.userPass;
	userName = req.body.userName;
	userPhone = req.body.userPhone;
	userAddr = req.body.userAddr;
	userAccount = req.body.userAccount;
	userSex = req.body.userSex;
	userAuth = req.body.userAuth
	userBirth = req.body.userBirth;

	let result = client.query('select * from t2_user');

	for(let i = 0; i < result.length; i++) {
		if(userId == result[i].userId) {
			res.send('아이디 중복');
			
		}
		else if(i == result.length - 1) {
			let result1 = client.query('select count(userNum) as count from t2_user');
			let result2 = client.query('insert into t2_user values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [result1[0].count, userPass, userName, userPhone, userAddr, userAccount, userSex, userAuth, userBirth, userId]);
			res.redirect('/src/userManagement/login')
		}
	}
});


module.exports = router;
