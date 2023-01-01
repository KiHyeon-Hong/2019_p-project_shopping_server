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

  let result = client.query('select * from t2_user, t2_review where t2_user.userNum=t2_review.userNum and productNum=' + req.query.productNum);

  let reviewName = [];
  let reviewStars = [];
  let reviewReview = [];
  let userNums = [];

  let count = 0;

  for(let i = 0; i < result.length; i++) {
    let userName = result[i].userName;
    let productStars = result[i].productStars;
    let productReview = result[i].productReview;
    let userNum = result[i].userNum;

    reviewName[i] = userName;
    reviewStars[i] = productStars;
    reviewReview[i] = productReview;
    userNums[i] = userNum;
  }

  console.log(reviewName);
  console.log(reviewStars);
  console.log(reviewReview);
  console.log(userNums);

  fs.readFile('./views/test/adminReviewList.ejs', 'utf8', (err, data) => {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('<meta charset=utf8>');
    res.end(ejs.render(data, {
      productNum: req.query.productNum,
      reviewName: reviewName,
      reviewStars: reviewStars,
      reviewReview: reviewReview,
      userNum: userNums
    }));
  });
});

router.post('/', (req, res) => {

});

module.exports = router;
