const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('sync-mysql');
const request = require('request');
const urlencode = require('urlencode');
const router = express.Router();

var client = new mysql({
	host: 'localhost',
	user: '2019pprj',
	password: 'pprj2019',
	database: 'db2019'
});

router.get('/', (req, res) => {
	let title = 'shop-grid-search';
	let msg = '';
	let relatedkeyword = "";
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
	
  let keyword = req.query.keyword;
  let product_result = [];
	let data = fs.readFileSync('./routes/admin/site.txt', 'utf-8');
	let site = (String(data).split(' '))[0];
	
	let urlKeyword = urlencode(keyword);
	console.log(urlKeyword);
  request({
    uri : 'http://182.172.143.159:65000/' + site + '/' + urlKeyword, 
		method : "GET",
		timeout: 5000,
		header : {
			"content-type" : "application/json;charset=utf-8"
		}
  },(error,response,body)=>{
		let result = JSON.parse(body);
		console.log(body);
		console.log(result);
		console.log('----------------');
	
  let related_keywords = result.related_keywords;
	let product_url = result.product_url;
	console.log(related_keywords);
	console.log(product_url);
	related_keywords.unshift(keyword);
	product_url.unshift("");

	let flag = 0;

  let keyword_result = client.query('select * from t2_keyword');
	for(let j=0;j<related_keywords.length; j++){

		if(flag == 1){
			break;
		}
		for(let i = 0; i< keyword_result.length; i++){
				console.log(related_keywords[j]);
					console.log(related_keywords[i]);
	    if(keyword_result[i].keyword == related_keywords[j]){
	      product_result = client.query('select * from t2_product NATURAL JOIN t2_keywordMatch where keywordNum='+keyword_result[i].keywordNum+' and productCheck=1');
				console.log('!!' + product_result[0].productNum);
				flag = 1;
	      break;
	    }
	  }
	}

	let result1 = client.query('select productNum, avg(productStars) as avg from t2_review group by productNum');

	let productNum = [];
	for(let i = 0; i < product_result.length; i++) {
		productNum[i] = product_result[i].productNum;
	}

	let stars = [];

	for(let i = 0; i < product_result.length; i++) {
		stars[i] = 0;
		for(let j = 0; j < result1.length; j++) {
				if(productNum[i] == result1[j].productNum) {
					stars[i] = result1[j].avg;
					break;
				}
			}
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
			product: product_result,
			related_keywords: related_keywords,
			product_url: product_url,
			stars: stars
		});
});


});

module.exports = router;
