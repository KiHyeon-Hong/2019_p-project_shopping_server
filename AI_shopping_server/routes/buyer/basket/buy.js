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
	let title = 'checkout-done';
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
  let userAddr = req.query.userAddr;
  console.log("0!"+userNum);
  let deliveryNum_result = client.query('select count(deliveryNum) as count from t2_delivery');
  let deliveryNum = deliveryNum_result[0].count;
  let basket_result = client.query('select * from t2_shoppingBasket JOIN t2_product on t2_product.productNum = t2_shoppingBasket.productNum where t2_shoppingBasket.userNum='+userNum);
  let deliveryPrice = 0;
  let productName = [];
	let productCount = [];
  let productPrice = [];

  basket_result.forEach((item,index)=>{
    productPrice[index] = item.productPrice*item.productCount;
		productCount[index] = item.productCount;
    deliveryPrice += productPrice[index];
    productName[index] = item.productName;
  });
	client.query('insert into t2_delivery values(?,sysdate(),?,?,?)',[deliveryNum,userAddr,deliveryPrice,userNum]);

	basket_result.forEach((item,index)=>{
		client.query('insert into t2_deliverySet values(?,?,?,?)',[deliveryNum,item.productNum, item.productCount, '결제대기']);
	});


let result1 = client.query('delete from t2_shoppingBasket where userNum=' + userNum);
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
			deliveryNum: deliveryNum,
			productName: productName,
      productCount: productCount,
      productPrice: productPrice,
      deliveryPrice: deliveryPrice,

		});

});

router.get('/confirm',(req,res)=>{
let title = 'checkout';
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

let userNum = req.session.userNum;
let userAddr = req.session.userAddr;
console.log("0!"+userNum);

let basket_result = client.query('select * from t2_shoppingBasket JOIN t2_product on t2_product.productNum = t2_shoppingBasket.productNum where t2_shoppingBasket.userNum='+userNum);
let deliveryPrice = 0;
let productName = [];
let productCount = [];
let productPrice = [];
basket_result.forEach((item,index)=>{
	productPrice[index] = item.productPrice*item.productCount;
	productCount[index] = item.productCount;
	deliveryPrice += productPrice[index];
	productName[index] = item.productName;
});

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
		productName: productName,
		productCount: productCount,
		productPrice: productPrice,
		deliveryPrice: deliveryPrice,

	});

});
module.exports = router;
