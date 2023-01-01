const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('sync-mysql');
const request = require('request');
const path = require('path');
const adminpath = path.resolve('./routes/admin/');
const router = express.Router();

var client = new mysql({
	host: 'localhost',
	user: '2019pprj',
	password: 'pprj2019',
	database: 'db2019'
});

router.get('/', (req, res) => {

  let title = 'admin-select-keyword';

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
let temp =  (String(fs.readFileSync(adminpath+"/site.txt")).split(" "))[0];
let msg = '';
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
			site: temp
		});
});

router.get('/update', (req, res) => {
    let title = 'admin-select-keyword';

		let site = req.query.site;
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
			let temp =  (String(fs.readFileSync(adminpath+"/site.txt")).split(" "))[0];
			console.log(temp+" "+site);
			fs.writeFileSync(adminpath+'/site.txt',site);
			
			let msg = '업데이트 완료!';
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
		site: site
  });
});

module.exports = router;
