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
	if(req.session.userAuth != '0' ){
		res.render('errorpage',{title:'error', msg: 'permission denied'})
		return ;
	}

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

  let result = client.query('select * from t2_user, t2_product where t2_user.userNum=t2_product.userNum and productCheck=0');

  let userNum = [];
  let userName = [];
  let productNum = [];
  let productName = [];
  let productImage = [];
  let productCategory = [];
  let productPrice = [];

	let title = 'admin-product-ok'
	let msg = ''
	let page = req.query.page;
	if(typeof page == "undefined") {
		page = 1;
	}

	res.render(title,
		{
				title: title,
				msg: msg,
				userNum: req.session.userNum,
				userId: req.session.userId,
				userPass: req.session.userPass,
				userName: req.session.userName,
				userPhone: req.session.userPhone,
				userAddr: req.session.userAddr,
				userAccount: req.session.userAccount,
				userSex: req.session.userSex,
				userAuth: req.session.userAuth,
				userBirth: req.session.userBirth,
				product: result,
				page: page
		});

});

router.get('/submit', (req, res) => {
	let productNum = req.query.productNum;

	let result = client.query('update t2_product set productCheck=1 where productNum=' + productNum);

	res.redirect('/src/admin/productManagement');
});


module.exports = router;
