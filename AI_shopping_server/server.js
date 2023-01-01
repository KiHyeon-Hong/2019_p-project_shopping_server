// Node.JS 내외부 모듈추출
const   cookieParser = require('cookie-parser');
const   session = require('express-session');
const   bodyParser = require('body-parser');
const   express = require('express');
const   app = express();
const   createError = require('http-errors');
const   path = require('path');

// 쇼핑몰전용 PORT주소 설정
const   PORT = 65004;

// 실행환경 설정부분
app.set('view engine', 'ejs');                    // view엔진 지정
app.use(express.static(path.join(__dirname, 'public')));   // public설정
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ key: 'sid',
                  secret: 'secret key',  // 세션id 암호화할때 사용
                  resave: false,         // 접속할때마다 id부여금지
                  saveUninitialized: true })); // 세션id사용전에는 발급금지

// URI와 핸들러를 매핑
//router 선언
const index = require('./routes/routerA.js');
const login = require('./routes/userManagement/login.js');
const register = require('./routes/userManagement/register.js');
const idFind = require('./routes/userManagement/idFind.js');
const passFind = require('./routes/userManagement/passFind.js');
const userInfoChange = require('./routes/userManagement/infoChange.js');
const logout = require('./routes/userManagement/logout.js');
const userDelete = require('./routes/userManagement/userDelete.js')
const buyerIndex = require('./routes/buyer/index.js');
const buyerShow = require('./routes/buyer/show.js');
const product_register = require('./routes/productManagement/register.js');
const productList = require('./routes/productManagement/productList.js');
const product_infoChange = require('./routes/productManagement/infoChange.js');
const productReview = require('./routes/productManagement/review.js');
const productDrop = require('./routes/productManagement/drop.js');
// const reviewDelete = require('./routes/productManagement/reviewDelete.js');
const reviewInsert = require('./routes/buyer/review/reviewInsert.js');
const reviewDelete2 = require('./routes/buyer/review/reviewDelete.js');
const reviewUpdate = require('./routes/buyer/review/reviewUpdate.js');
const adminProductList = require('./routes/admin/productList.js');
const adminReviewList = require('./routes/admin/reviewList.js');
const adminReviewDelete = require('./routes/admin/reviewDelete.js');
const salesDetail = require('./routes/salesManagement/salesDetail.js');
const salesManagementChange = require('./routes/salesManagement/change.js');
const searchCategory = require('./routes/buyer/search/category.js')
const searchImage = require('./routes/buyer/search/image.js')
const searchKeyword = require('./routes/buyer/search/keyword.js')
const cart = require('./routes/buyer/basket/index.js');
const cartInsert = require('./routes/buyer/basket/insert.js');
const cartDrop = require('./routes/buyer/basket/drop.js');
const cartBuy = require('./routes/buyer/basket/buy.js');
const buyList = require('./routes/buyer/buyList.js');
const adminInfoChange = require('./routes/userManagement/adminInfoChange.js');
const adminIndex = require('./routes/admin/index.js');
const adminMainPageManagement = require('./routes/admin/mainPageManagement.js');
const adminSalesManagement = require('./routes/admin/salesManagement.js');
const adminMarketing = require('./routes/admin/marketing.js');

const adminProdcutRegister = require('./routes/admin/productManagement.js');
const adminUserManagement = require('./routes/admin/userManagement.js');
const adminSellerManagement = require('./routes/admin/sellerManagement.js');
const imageFiltering = require('./routes/productManagement/imageFiltering.js');
const keywordManagement = require('./routes/admin/keywordManagement.js');
const imageSearchManagement = require('./routes/admin/imageSearchManagement.js');
const daySell = require('./routes/salesManagement/daySell.js');
//router 적재
app.use('/src/userManagement/login', login);
app.use('/src/userManagement/register', register);
app.use('/src/userManagement/idFind', idFind);
app.use('/src/userManagement/passFind', passFind);
app.use('/src/userManagement/infoChange', userInfoChange);
app.use('/src/userManagement/logout', logout);
app.use('/src/userManagement/userDelete', userDelete);
app.use('/src/buyer/index', buyerIndex);
app.use('/src/buyer/show', buyerShow);
app.use('/src/productManagement/register',product_register);
app.use('/src/productManagement/productList',productList);
app.use('/src/productManagement/infoChange',product_infoChange)
app.use('/src/productManagement/review', productReview);
// app.use('/src/productManagement/reviewDelete', reviewDelete);
app.use('/src/buyer/review/reviewInsert', reviewInsert);
app.use('/src/buyer/review/reviewDelete', reviewDelete2);
app.use('/src/buyer/review/reviewUpdate', reviewUpdate);
app.use('/src/admin/productList', adminProductList);
app.use('/src/admin/reviewList', adminReviewList);
app.use('/src/admin/reviewDelete', adminReviewDelete);
app.use('/src/productManagement/drop', productDrop);
app.use('/src/salesManagement/salesDetail', salesDetail);
app.use('/src/salesManagement/change', salesManagementChange);
app.use('/src/buyer/search/category', searchCategory);
app.use('/src/buyer/search/image', searchImage);
app.use('/src/buyer/search/keyword', searchKeyword);
app.use('/src/buyer/basket/index', cart);
app.use('/src/buyer/basket/insert', cartInsert);
app.use('/src/buyer/basket/drop', cartDrop);
app.use('/src/buyer/basket/buy', cartBuy);
app.use('/src/buyer/buyList', buyList);
app.use('/src/userManagement/adminInfoChange', adminInfoChange);
app.use('/src/admin/index', adminIndex);
app.use('/src/admin/mainPageManagement', adminMainPageManagement);
app.use('/src/admin/salesManagement', adminSalesManagement);
app.use('/src/admin/marketing', adminMarketing);
app.use('/src/salesManagement/daySell', daySell);
app.use('/',index);

app.use('/src/admin/productManagement', adminProdcutRegister);
app.use('/src/admin/userManagement', adminUserManagement);
app.use('/src/admin/sellerManagement', adminSellerManagement);
app.use('/src/productManagement/imageFiltering', imageFiltering);
app.use('/src/admin/keywordManagement',keywordManagement);
app.use('/src/admin/imageSearchManagement',imageSearchManagement);

// 서버를 실행합니다.
app.listen(PORT, function () {
       console.log('서버실행: http://203.249.127.60:' + PORT);
       console.log('서버실행: http://192.9.80.96:' + PORT);
       console.log('----------------------- ------------------- ');
      console.log('|  shopping mall server running '+PORT+'!!   |');
       console.log('|         내부 서버 : 192.9.80.96         |');
       console.log('|        외부 서버 : 203.249.127.60       |');
       console.log('------------------------ ------------------');
});