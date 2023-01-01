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
		if(req.session.userAuth != '2' && req.session.userAuth != '0'){
			res.render('errorpage',{title:'error', msg: 'permission denied'})
			return ;
		}

  let productNum = req.query.productNum;
  console.log('0!'+productNum);
  client.query('update t2_product set productCheck=2 where productNum='+ productNum);



  if(req.session.userAuth == '0'){	
	res.redirect('back');

  }else {
	res.redirect('/src/productManagement/productList');
  }
});

module.exports = router;
