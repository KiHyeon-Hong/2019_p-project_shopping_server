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
	let title = 'seller-product-manage-detail';
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

  let productNum = req.query.productNum;

  console.log("0!"+productNum);
	let product_result = client.query('select * from t2_product where productNum='+productNum);
	console.log(product_result[0].productNum);
  let delivery_result = client.query('select t2_delivery.deliveryDate as deliveryDate, t2_delivery.deliveryAddr as deliveryAddr, t2_delivery.deliveryPrice as deliveryPrice, t2_delivery.userNum as userNum, t2_deliverySet.productCount as productCount, t2_deliverySet.deliveryState as deliveryState, t2_delivery.deliveryNum as deliveryNum from t2_delivery inner join t2_deliverySet on t2_delivery.deliveryNum = t2_deliverySet.deliverynum where t2_deliverySet.productNum='+productNum);

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
     		product: product_result,
			delivery: delivery_result
		});

});

module.exports = router;
