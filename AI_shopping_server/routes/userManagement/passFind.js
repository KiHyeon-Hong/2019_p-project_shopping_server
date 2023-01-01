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

			let title = 'forget-account0'
			let msg = ''
			let userName = req.session.userName;

			res.render(title,
				{
					title: title,
					msg: msg,
					userName: userName,
					userAuth: req.session.userAuth
				});
});

router.post('/', (req, res) => {
	console.log(req.body)
	let userId = "", userPhone = "";
	userId = req.body.userId;
	userPhone = req.body.userPhone;

  let result = client.query('select * from t2_user where userId="' + userId + '" and userPhone="' + userPhone + '"');
	if(result.length == 0) {
		var responseData = {'result' : 'ok', 'resultv' : "정보가 없습니다"}
		console.log(responseData)
		res.json(responseData);
	}
	else {
		var responseData = {'result' : 'ok', 'resultv' : result[0].userPass}
		console.log(responseData)
		res.json(responseData);
	}
});


module.exports = router;
