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

});

router.post('/', (req, res) => {
  let userNum = req.body.userNum;
  let productNum = req.body.productNum;
  let productCount = req.body.productCount;
	if(req.session.userAuth != '1' ){
		res.render('errorpage',{title:'error', msg: 'permission denied'})
		return ;
	}

	let result1 = client.query('delete from t2_shoppingBasket where userNum=' + userNum + ' and productNum=' + productNum);

	let result2 = client.query('insert into t2_shoppingBasket values(' +  userNum + ', ' + productNum + ', ' + productCount + ')');
	var responseData = {'result' : 'ok', 'resultv' : "장바구니 추가완료!"}
	console.log(responseData)
	res.json(responseData);
});

module.exports = router;
