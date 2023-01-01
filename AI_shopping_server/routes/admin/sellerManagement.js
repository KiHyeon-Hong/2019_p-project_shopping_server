const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('sync-mysql');
const request = require('request');
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

  let result = client.query('select * from t2_user where userAuth=2');

	let userNum = [];
  let userName = [];
  let userId = [];
  let userPhone = [];
  let userAddr = [];
  let userAccount = [];
  let userSex = [];
  let userAuth = [];
  let userBirth = [];

  for(let i = 0; i < result.length; i++) {
    userNum[i] = result[i].userNum,
    userName[i] = result[i].userName,
    userId[i] = result[i].userId,
    userPhone[i] = result[i].userPhone,
    userAddr[i] = result[i].userAddr,
    userAccount[i] = result[i].userAccount,
    userSex[i] = result[i].userSex,
    userAuth[i] = result[i].userAuth,
    userBirth[i] = result[i].userBirth
  }
	console.log(userNum);

	let title = 'admin-seller-list'
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
				user: result,
				page: page
		});

});

router.get('/detail', (req, res) => {
	if(req.session.userAuth != '0' ){
		res.render('errorpage',{title:'error', msg: 'permission denied'})
		return ;
	}

  let title = 'admin-seller-detail';
  let msg = '';
	let page = req.query.page;
	if(typeof page == "undefined") {
		page = 1;
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

  let userNum = req.query.userNum;
  console.log("0!"+userNum);
  let product_result = client.query('select * from t2_product where userNum='+userNum+' and productCheck=1');
	let results1 = client.query('select * from t2_user where userNum=' + userNum);
	console.log(userNum);
	let results2 = client.query('select concat(year(deliveryDate), "-", month(deliveryDate), "-", day(deliveryDate)) as ym, sum((productCount*productPrice)) as totalPrice from t2_delivery, t2_deliverySet, t2_product where t2_product.productNum=t2_deliverySet.productNum and t2_delivery.deliveryNum=t2_deliverySet.deliveryNum and t2_product.userNum='+ userNum + ' group by ym order by deliveryDate asc');
	let labels = [];
	let data = [];
	for(let i = 0; i < results2.length; i++) {
		labels[i] = results2[i].ym;
 	console.log(results2[i].ym);
 	data[i] = results2[i].totalPrice;
 	console.log(results2[i].totalPrice);
	 console.log('------------------')
}
console.log("1!"+product_result);
request({
	//uri : 'http://localhost:8080/price_prediction',
	uri : 'http://182.172.143.159:65000/price_prediction',
	method : "POST",
	json: {
		"labels" : labels,
		"data" : data
	}
},(error,response,body)=>{
	console.log("2!"+body);
	let temp = String(body);
	let nextDay = new Date();
	let year = nextDay.getFullYear();
	let month = ("0"+(nextDay.getMonth()+1)).slice(-2);
	let d = ("0"+nextDay.getDate()).slice(-2);
	labels.push(year+"-"+month+"-"+d);
	data.push(parseInt(temp));

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
			user: results1,
      product: product_result,
			labels: labels,
			data: data,
			page: page
    });
	});
});

router.get('/delete', (req, res) => {
	if(req.session.userAuth != '0' ){
		res.render('errorpage',{title:'error', msg: 'permission denied'})
		return ;
	}
	let result = client.query('update t2_user set userAuth=3 where userNum='+req.query.userNum);
	res.redirect('/src/admin/sellerManagement');
});

module.exports = router;
