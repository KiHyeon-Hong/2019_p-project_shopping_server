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




		let productNum = req.body.productNum;
	  let deliveryNum = req.body.deliveryNum;
	  let deliveryState = req.body.deliveryState;
  console.log("0!"+productNum+"0!"+deliveryNum+"0!"+deliveryState);
  client.query('update t2_deliverySet set deliveryState="'+deliveryState+'" where deliveryNum='+deliveryNum+' and productNum='+productNum);


	var responseData = {'result' : 'ok', 'resultv' : "deliveryState"}
	console.log(responseData)
	res.json(responseData);

});

module.exports = router;
