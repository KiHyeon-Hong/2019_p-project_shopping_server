const express = require('express');
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
	console.log("회원탈퇴")
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

	
  let result = client.query('update t2_user set userAuth=3 where userNum=' + req.query.userNum);

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

  res.redirect('/src/buyer/index');
});



module.exports = router;
