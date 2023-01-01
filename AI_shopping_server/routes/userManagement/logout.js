const express = require('express');
const ejs = require('ejs');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('logout');
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

  res.redirect('/src/buyer/index');
});

module.exports = router;
