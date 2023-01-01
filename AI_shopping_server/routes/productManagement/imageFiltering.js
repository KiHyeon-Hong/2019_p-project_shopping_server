const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('sync-mysql');
const request = require('request');
const multer = require('multer');
const path = require('path');
const router = express.Router();
let productNum = 0;
let mypath = path.resolve('./public/images/');
let ext = "";
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
			cb(null, mypath + "/" + field);
		},
		filename(req, file, cb) {
			console.log(file.originalname);
			ext = path.extname(file.originalname);
			let dbpath = "/temp" + ext;
			cb(null, dbpath);
		}
	})
});



router.post('/', upload.single('main'), (req, res) => {
    let productNum = '0';
	request({
		uri : 'http://182.172.143.159:65000/image_recognition', 
		//uri : 'http://localhost:8080/image_recognition',
	    method : "POST",
			timeout: 5000,
	    headers: {
	      "Content-Type" : "multipart/form-data"
	    },
	    formData : {
	      "img" : fs.createReadStream(mypath+"/main/temp"+ext)
	    }
	  },(error,response,body)=>{


		console.log("!"+body);
		let result = String(body);
			var substring = "error";
			if(result == "unrecog" || result.indexOf(substring) != -1){
			// if(result == "unrecog"){
			var responseData = {'result' : 'bad', 'resultv' : '부적절한 이미지 입니다'}
			console.log(responseData)
			res.json(responseData);
		}else{
			var responseData = {'result' : 'ok', 'resultv' : '다음을 진행해주세요'}
			console.log(responseData)
			res.json(responseData);
		}
	  });
});

module.exports = router;
