const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('sync-mysql');
const multer = require('multer');
const path = require('path');
const adminpath = path.resolve('./routes/admin/');
const router = express.Router();
let productNum = 0;
let mypath = path.resolve('./public/images');
let ext = "";
var client = new mysql({
	host: 'localhost',
	user: '2019pprj',
	password: 'pprj2019',
	database: 'db2019'
});
let fields = "";
let field = [];
let fileName = "logo.png";
let fileArray = ['1','1','1','1'];
var upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			fields = file.fieldname;
			field = fields.split('_');
			console.log("1!" + field[0]);
			cb(null, mypath + "/" + field[0]);
		},
		filename(req, file, cb) {
			console.log(file.originalname);
			ext = path.extname(file.originalname);
			console.log("2!" + ext);
			if(field[0] == 'bg'){
				fileArray[parseInt(field[1])] = file.originalname;
				cb(null, file.originalname)
			}else{
				fileName = 'logo.png'
				cb(null, fileName);
			}



		}
	})
});

router.get('/', (req, res) => {
	if (req.session.userAuth != '0') {
		res.render('errorpage', { title: 'error', msg: 'permission denied' })
		return;
	}

	if (typeof req.session.userNum == "undefined") {
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

	let title = 'admin-main-edit';
	let msg = '';
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
router.post('/logo', upload.fields([{ name: 'logo', maxCount: 1 }]), (req, res) => {
	let color = req.body.color;
	let logo = req.body.logo;
	fs.writeFileSync(adminpath+'/logo.txt',fileName+" "+color);
	res.redirect('/src/admin/mainPageManagement');
});
router.get('/name', (req, res) => {
	if (req.session.userAuth != '0') {
		res.render('errorpage', { title: 'error', msg: 'permission denied' })
		return;
	}

	if (typeof req.session.userNum == "undefined") {
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

	fs.readFile('./routes/admin/nameInfo.txt', 'utf8', (err, name) => {
		console.log("이름: " + name);
		let title = 'admin-main-edit-name'
		let msg = ''

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
				name: name
			})
	});
});

router.post('/name', (req, res) => {
	fs.writeFile('./routes/admin/nameInfo.txt', req.body.name, 'utf8', (err) => {
		res.redirect('/src/admin/mainPageManagement');
	});
});

router.get('/logo', (req, res) => {
	let title = 'admin-main-edit-logo'
	let msg = ''
	if (req.session.userAuth != '0') {
		res.render('errorpage', { title: 'error', msg: 'permission denied' })
		return;
	}

	if (typeof req.session.userNum == "undefined") {
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

	let data = fs.readFileSync('./routes/admin/logo.txt', 'utf-8');
	console.log(data);
	data = String(data).split(' ');
	let logo = data[0]
	let color = data[1]

	console.log("logo: " + logo);
	console.log("color: " + color);

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
			logo: logo,
			color: color
		})
});
router.get('/background', (req, res) => {
	let title = 'admin-main-edit-background'
	let msg = ''
	if (req.session.userAuth != '0') {
		res.render('errorpage', { title: 'error', msg: 'permission denied' })
		return;
	}

	if (typeof req.session.userNum == "undefined") {
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

	let data = fs.readFileSync('./routes/admin/bg.txt', 'utf-8');
	console.log(data);
	let bg = String(data).split('/');

	for(let i=0;i<bg.length;i++){
		console.log(bg[i]);
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
			bg: bg
		})
});
router.post('/background', upload.fields([{ name: 'bg_0', maxCount: 1 },{ name: 'bg_1', maxCount: 1 },{ name: 'bg_2', maxCount: 1 },{ name: 'bg_3', maxCount: 1 }]), (req, res) => {
	
	let data = fs.readFileSync(adminpath+'/bg.txt','utf-8');
	let bgArray = String(data).split('/');
	for(let i=0;i<4;i++){
		if(bgArray[i] != fileArray[i] && fileArray[i] != '1'){
			bgArray[i] = fileArray[i];
		}
	}
	let bg = bgArray.join('/');
	fs.writeFileSync(adminpath+'/bg.txt',bg);
	fileArray = ['1','1','1','1'];
	bg = "";
	res.redirect('/src/admin/mainPageManagement');
});
router.get('/ad', (req, res) => {
	let title = 'admin-main-edit-ad'
	let msg = ''
	if (req.session.userAuth != '0') {
		res.render('errorpage', { title: 'error', msg: 'permission denied' })
		return;
	}

	if (typeof req.session.userNum == "undefined") {
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

	let result = client.query('select * from t2_user, t2_product where t2_product.userNum=t2_user.userNum and adminCheck!=0 order by adminCheck asc');
	let result1 = client.query('select * from t2_user, t2_product where t2_product.userNum=t2_user.userNum');


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
			adminCheck: result,
			total: result1
		})
});

router.post('/ad', (req, res) => {
	let ad = req.body.ad;

	let temp = client.query('select count(*) as count from t2_product');
	console.log('성재1' + ad)

	for(let i = 0; i < temp[0].count; i++) {
		let result = client.query('update t2_product set adminCheck=0');
	}

	console.log('성재2' + ad)
	let result1 = client.query('update t2_product set adminCheck=1 where productNum=' + ad[0]);
	let result2 = client.query('update t2_product set adminCheck=2 where productNum=' + ad[1]);
	let result3 = client.query('update t2_product set adminCheck=3 where productNum=' + ad[2]);
	let result4 = client.query('update t2_product set adminCheck=4 where productNum=' + ad[3]);

	res.redirect('/src/admin/mainPageManagement');
});

module.exports = router;