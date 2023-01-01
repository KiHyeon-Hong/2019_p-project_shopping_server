const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('sync-mysql');
const request = require('request');
const router = express.Router();
var end_time = new Date();
var left;

var client = new mysql({
	host: 'localhost',
	user: '2019pprj',
	password: 'pprj2019',
	database: 'db2019'
});
router.get('/', (req, res) => {

  let title = 'admin-image-search';
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

 

  let nowTime = new Date();
  console.log("남은시간:"+nowTime);
  console.log("남은시간:"+end_time);
  console.log("남은시간:"+ (end_time.getTime() - nowTime.getTime()));
  left = end_time.getTime() - nowTime.getTime();
  left = left / 1000;
  let temp = left;
  left = Math.floor((left / 60)) + "분" + " " + Math.floor((left%60)) + "초";
  if(temp <= 0) {
    left = 0;
  }
  let data = fs.readFileSync('./routes/admin/imageSearchLog.txt', 'utf-8');
  console.log(data);
  let imageSearchLog = String(data).split(' ');
  let total = imageSearchLog[0];
  let fail = imageSearchLog[1];
  let data2 = [];
	data2[0] = parseInt(total - fail);
	data2[1] = parseInt(fail);
  console.log(data2[0]+" "+data2[1]);

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
    data2: data2,
    time: left,
    time2: temp
  });
});

router.get('/update', (req, res) => {

  let title = ' ';
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
  console.log("남은시간:"+left);
  if(left <= 0){
    request({
      // uri : 'http://182.172.143.159:65000/img_model_update',
      uri : 'http://localhost:8080/img_model_update',
      method : "GET"
    },(error,response,body)=>{
      console.log(body); 
    let result =  String(body); //추출
    console.log(result);
    end_time = new Date();
    end_time.setMinutes(end_time.getMinutes()+10);
  
   res.send("");

  });
  }else{
    res.send("");
  }
});

module.exports = router;