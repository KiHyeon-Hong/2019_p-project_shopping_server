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
	if(req.session.userAuth != '1' && req.session.userAuth != '2'){
		res.render('errorpage',{title:'error', msg: 'permission denied'})
		return ;
	}

	let title = 'user-info-edit'
	let msg = ''
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
      userBirth: req.session.userBirth
		});


});

router.post('/', (req, res) => {
	let userNum = "", userPass = "", userName = "", userPhone = "", userAddr = "", userAccount = "", userSex = "", userBirth = "";
	userNum = req.body.userNum;
	userPass = req.body.userPass;
	userName = req.body.userName;
	userPhone = req.body.userPhone;
	userAddr = req.body.userAddr;
	userAccount = req.body.userAccount;
	userSex = req.body.userSex;
	userBirth = req.body.userBirth;

  console.log('update t2_user set userPass="' + userPass + '", userName="' + userName + '", userPhone="' + userPhone + '", userAddr="', + userAddr + '", userAccount="' + userAccount + '", userSex=' + userSex + ' , userBirth="' + userBirth + '" where userNum=' + userNum);
  let result = client.query('update t2_user set userPass="' + userPass + '", userName="' + userName + '", userPhone="' + userPhone + '", userAddr="' + userAddr + '", userAccount="' + userAccount + '", userSex=' + userSex + ' , userBirth="' + userBirth + '" where userNum=' + userNum);

  req.session.userPass = userPass;
  req.session.userName = userName;
  req.session.userPhone = userPhone;
  req.session.userAddr = userAddr;
  req.session.userAccount = userAccount;
	req.session.userSex = userSex;
  req.session.userBirth = userBirth;

  res.redirect('/src/buyer/index');
});


module.exports = router;
