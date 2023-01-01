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
	let title = 'cart';
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
		if(req.session.userAuth != '1' ){
			res.render('errorpage',{title:'error', msg: 'permission denied'})
			return ;
		}
  let userNum = req.session.userNum;
  console.log("0!"+userNum);
  let basket_result = client.query('select * from t2_shoppingBasket As shoppingBasket JOIN t2_product as product on product.productNum = shoppingBasket.productNum where shoppingBasket.userNum='+userNum);
console.log("1!"+basket_result);
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
      basket: basket_result
		});

});

module.exports = router;
