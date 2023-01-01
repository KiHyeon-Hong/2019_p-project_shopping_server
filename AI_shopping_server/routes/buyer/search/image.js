const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('sync-mysql');
const multer = require('multer');
const path = require('path');
const request = require('request');
const router = express.Router();
let mypath = path.resolve('./public/images');
let adminpath = path.resolve('./routes/admin');
let ext = "";
let keyword = "1";
let product_result = [];
var client = new mysql({
	host: 'localhost',
	user: '2019pprj',
	password: 'pprj2019',
	database: 'db2019'
});
var upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			let field = file.fieldname;
			console.log("1!" + field);
			cb(null, mypath + "/");
		},
		filename(req, file, cb) {
			let field = file.fieldname;
			console.log(file.originalname);
			ext = path.extname(file.originalname);
			console.log("2!" + ext);
			console.log("3!" + mypath + "/search"+ext);
			cb(null, field+ext);
		}
	})
});

router.get('/', (req, res) => {
	let title = 'search-image';
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
      userBirth: req.session.userBirth
		});

});

router.post('/', upload.fields([{ name: 'search', maxCount: 1 }]), (req, res) => {
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
		request({
	     uri : 'http://182.172.143.159:65000/image_recognition', 
		//uri : 'http://localhost:8080/image_recognition',
	    method : "POST",
			timeout: 5000,
	    headers: {
	      "Content-Type" : "multipart/form-data"
	    },
	    formData : {
	      "img" : fs.createReadStream(mypath+"/search"+ext)
	    }
	  },(error,response,body)=>{


	    console.log("!"+body);
			 keyword = String(body);

			let imageSearchLog =  String(fs.readFileSync(adminpath+"/imageSearchLog.txt")).split(" ");
			let imageSearchTimeLog = [];
		imageSearchTimeLog[0] = parseInt(imageSearchLog[0])+1;
		imageSearchTimeLog[1] = parseInt(imageSearchLog[1]);
	    fs.writeFileSync(adminpath+'/imageSearchLog.txt',imageSearchTimeLog[0]+" "+imageSearchTimeLog[1]);

			let keyword_result = client.query('select * from t2_keyword');

				for(let i = 0; i< keyword_result.length; i++){
					if(keyword_result[i].keyword == keyword){
						product_result = client.query('select * from t2_product NATURAL JOIN t2_keywordMatch where keywordNum='+keyword_result[i].keywordNum+' and productCheck=1');
						break;
					}
				}

			if(product_result){
		         var responseData = {'result' : 'ok', 'resultv' : keyword}
		         console.log(responseData)
		         res.json(responseData);
		     }else if(product_result){
		         var responseData = {'result' : 'bad', 'resultv' : keyword}
		         console.log(responseData)
		         res.json(responseData);
		     }
	  });
});

router.get('/result',(req,res)=>{
	res.redirect('/src/buyer/search/keyword?keyword='+req.query.keyword)

	
});

router.get('/retry',(req,res)=>{
  let title = 'search-image';
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
  let imageSearchLog =  String(fs.readFileSync(adminpath+"/imageSearchLog.txt")).split(" ");
  let imageSearchTimeLog = [];
  imageSearchTimeLog[0] = parseInt(imageSearchLog[0]);
  imageSearchTimeLog[1] = parseInt(imageSearchLog[1])+1;
  fs.writeFileSync(adminpath+'/imageSearchLog.txt',imageSearchTimeLog[0]+" "+imageSearchTimeLog[1]);
  
  
  
  res.redirect('/src/buyer/search/image')

});

module.exports = router;
