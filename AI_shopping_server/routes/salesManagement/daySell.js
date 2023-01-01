const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const request = require('request');
const mysql = require('sync-mysql');

const router = express.Router();

var client = new mysql({
	host: 'localhost',
	user: '2019pprj',
	password: 'pprj2019',
	database: 'db2019'
});

router.get('/', (req, res) => {
	if(req.session.userAuth != '2' ){
		res.render('errorpage',{title:'error', msg: 'permission denied'})
		return ;
	}

  let title = 'seller-chart';
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

  let userNum = req.query.userNum;
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
console.log(typeof(labels[0]));
for(let i = 0; i< labels.length; i++){
	console.log(labels[i]);
	console.log(data[i]);
	console.log("//////////////");
}
request({
	//uri : 'http://localhost:8080/price_prediction',
	uri : 'http://182.172.143.159:65000/price_prediction',
	method : "POST",
	json: {
		"labels" : labels,
		"data" : data
	}
},(error,response,body)=>{
	console.log(body);
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
			labels: labels,
			data: data
    });
	});
});

module.exports = router;
