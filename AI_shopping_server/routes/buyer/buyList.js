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
  let userNum = req.session.userNum;
	if(req.session.userAuth != '1' ){
		res.render('errorpage',{title:'error', msg: 'permission denied'})
		return ;
	}
  let result = client.query('select * from t2_delivery, t2_deliverySet, t2_product where t2_delivery.deliveryNum=t2_deliverySet.deliveryNum and t2_product.productNum=t2_deliverySet.productNum and t2_delivery.userNum=' + userNum+' order by t2_deliverySet.deliveryNum');

  let deliveryNum = [];
  let deliveryDate = [];
  let deliveryPrice = [];
  let productImage = [];
  let productNum = [];
  let productName = [];
  let productCount = [];
  let deliveryState = [];

  for(let i = 0; i < result.length; i++) {
    deliveryNum[i] = result[i].deliveryNum;
    deliveryDate[i] = result[i].deliveryDate;
    deliveryPrice[i] = result[i].deliveryPrice;
    productImage[i] = result[i].productImage;
    productNum[i] = result[i].productNum;
    productName[i] = result[i].productName;
    productCount[i] = result[i].productCount;
    deliveryState[i] = result[i].deliveryState;
  }

  console.log(deliveryState);

	let title = 'purchase-details'
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
	      deliveryNum: deliveryNum,
	      deliveryDate: deliveryDate,
	      deliveryPrice: deliveryPrice,
	      productImage: productImage,
	      productNum: productNum,
	      productName: productName,
	      productCount: productCount,
	      deliveryState: deliveryState,
				page: page
		});


});

router.post('/', (req, res) => {

});

module.exports = router;
