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

router.post('/', (req, res) => {
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
		if(req.session.userAuth != '1' ){
			res.render('errorpage',{title:'error', msg: 'permission denied'})
			return ;
		}
  let userNum = req.session.userNum;
  let productNum = req.body.productNum;

  console.log("0!"+userNum);
  client.query('delete from t2_shoppingBasket where productNum='+productNum+' and userNum='+userNum);

console.log("뭐지")
	res.redirect('/src/buyer/basket/index')

});

module.exports = router;
