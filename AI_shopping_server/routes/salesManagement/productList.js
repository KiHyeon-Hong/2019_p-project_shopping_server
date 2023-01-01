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
	let title = 'seller-product-manage';
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
			if(req.session.userAuth != '2'){
				res.render('errorpage',{title:'error', msg: 'permission denied'})
				return ;
			}

  let userNum = req.session.userNum;
  console.log("0!"+userNum);
  let product_result = client.query('select * from t2_product where userNum='+userNum+' and productCheck=1');
console.log("1!"+product_result);
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
      product: product_result
		});

});

module.exports = router;
