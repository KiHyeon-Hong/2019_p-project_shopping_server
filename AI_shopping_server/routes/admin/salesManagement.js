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
    let title = 'admin-chart';
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
  		if(req.session.userAuth != '0' ){
  			res.render('errorpage',{title:'error', msg: 'permission denied'})
  			return ;
  		}

let result = client.query('select deliveryDate, deliveryPrice from t2_delivery order by deliveryDate asc');
let gunsu_result = client.query('select count(*) as count from t2_deliverySet');

let results2 = client.query('select concat(year(deliveryDate), "-", month(deliveryDate), "-", day(deliveryDate)) as ym, count(*) as total from t2_delivery, t2_deliverySet, t2_product where t2_product.productNum=t2_deliverySet.productNum and t2_delivery.deliveryNum=t2_deliverySet.deliveryNum group by ym order by deliveryDate asc');


let labels = [];
let data = [];
let count = 0;
result.forEach((item,index)=>{
  let date = String(item.deliveryDate).split(" ");
  console.log(date[0]);

  if(index == 0){
    labels[index] = date[0];
    data[index] = item.deliveryPrice;
  }else{
    if(labels[count] == date[0]){
      data[count] += item.deliveryPrice;
    }else{
      labels[++count] = date[0];
      data[count] = item.deliveryPrice;
    }
  }
  console.log(labels[count]+" "+data[count]);
});
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
    data: data,
		gunsu: gunsu_result[0].count,
		today: results2[results2.length-1].total
  });
});

});

router.get('/all', (req, res) => {
    let title = 'admin-chart';
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
  		if(req.session.userAuth != '0' ){
  			res.render('errorpage',{title:'error', msg: 'permission denied'})
  			return ;
  		}

let result = client.query('select deliveryDate, deliveryPrice from t2_delivery order by deliveryDate asc');
let data = [];
let labels = [];
for(let i=0;i<result.length;i++){
  labels[i] = result[i].deliveryDate;
  data[i] = result[i].deliveryPrice;
}



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


module.exports = router;
