const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('sync-mysql');
const multer = require('multer');
const path =require('path');
const router = express.Router();
let productNum = 0;
let mypath = path.resolve('./public/images');
let ext = "";
let fields = "";
let field = [];
let detailImage = [];
let i = 0;
var client = new mysql({
	host: 'localhost',
	user: '2019pprj',
	password: 'pprj2019',
	database: 'db2019'
});
var upload = multer({
  storage: multer.diskStorage({
    destination(req,file,cb){
			fields = file.fieldname;
			field = fields.split('_');
			console.log("1!"+mypath+"/"+field[0]);
      cb(null,mypath+"/"+field[0]);
    },
    filename(req,file,cb){
      console.log(file.originalname);
      ext = path.extname(file.originalname);
			console.log("2!"+ext);
			let dbpath = "";
			if(fields == 'main'){
				let productImage = 'product'+productNum+ext;
				dbpath = "/"+productImage;
				client.query('update db2019.t2_product set productImage="'+productImage+'" where productNum='+productNum);
			}
			if(fields == 'detail_0'){
				detailImage[i] = 'product'+productNum+'_'+field[1]+ext;
				dbpath = "/"+detailImage[i++];
			}
			if(fields == 'detail_1'){
				detailImage[i] = 'product'+productNum+'_'+field[1]+ext;
				dbpath = "/"+detailImage[i++];
			}
			if(fields == 'detail_2'){
				detailImage[i] = 'product'+productNum+'_'+field[1]+ext;
				dbpath = "/"+detailImage[i++];
			}
			if(fields == 'detail_3'){
				detailImage[i] = 'product'+productNum+'_'+field[1]+ext;
				dbpath = "/"+detailImage[i++];
			}

			console.log("3!"+mypath+"/"+field[0]+dbpath);
      cb(null,dbpath);
			console.log("저장완료")
    }
  })
});

router.get('/', (req, res) => {
	let title = 'product-edit';
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

			if(req.session.userAuth != '2' ){
				res.render('errorpage',{title:'error', msg: 'permission denied'})
				return ;
			}

    productNum = parseInt(req.query.productNum);
    console.log("0!"+productNum);
    let product_result = client.query('select * from t2_product where productNum=?',[productNum]);
    console.log("1!"+product_result);
		let result3 = client.query('select * from t2_product, t2_detailProduct where t2_product.productNum=t2_detailProduct.productNum and t2_product.productNum=' + req.query.productNum);
		let detail = ["../image_upload.png", "../image_upload.png", "../image_upload.png", "../image_upload.png"];
		for(let j = 0; j < result3.length; j++) {
			let t = result3[j].detailImage.split(".")[0].split("_")[1];
			detail[parseInt(t)] = result3[j].detailImage;
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
			detailImage: detail
		});

});

router.post('/', upload.fields([{name: 'main' , maxCount:1},{ name: 'detail_0', maxCount: 1 },{ name: 'detail_1', maxCount: 1 },{ name: 'detail_2', maxCount: 1 },{ name: 'detail_3', maxCount: 1 }]), (req, res) => {
	let productName = req.body.productName;
	let productCategory = req.body.productCategory;
  let productPrice = req.body.productPrice;
  let productText = req.body.productText;
  let userNum = req.session.userNum;
  let productCheck = 1;
	console.log("3-4!");


	let result = client.query('update db2019.t2_product set productName="'+productName+'", productCategory="'+productCategory+'", productPrice='+productPrice+', productText="'+productText+'", userNum='+userNum+', productCheck='+productCheck+' where productNum='+productNum);
console.log("4!");
	let image_result = client.query('select * from t2_detailProduct where productNum='+productNum);
	let flag = 0;
	console.log("5!");
	console.log(detailImage);
	detailImage.forEach((item,index)=>{
		if(item == '' || item == null || typeof item == 'undefined' || item.length == 0){
			detailImage.splice(index,1);
		}
	});
	if(detailImage.length != 0){
		for(let k=0;k<i;k++){
			for(let j = 0;j<image_result.length;j++){
				console.log((detailImage[k].split('.'))[0]);
				console.log(((image_result[j].detailImage).split('.'))[0]);
				if((detailImage[k].split('.'))[0] == ((image_result[j].detailImage).split('.'))[0])
				{
					console.log("6!"+k+" "+j+" "+i);
					client.query('update t2_detailProduct set detailImage="'+detailImage[k]+'" where detailImage="'+image_result[j].detailImage+'"');
					console.log("6@");
					flag = 1;
					break;
				}
			}
			if(flag == 0){
				console.log("7!");
				client.query('insert into t2_detailProduct values(?,?)',[productNum,detailImage[k]]);
				console.log("8!");
			}
			else{
				flag = 0;
				console.log("8!");
			}
		}
	}
	detailImage = [];
	i = 0;
	console.log(detailImage);

  res.redirect('/src/productManagement/productList');
});

module.exports = router;
