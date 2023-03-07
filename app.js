// enviortoment variables
const env =require("dotenv");
env.config();

var express =require('express');
var app = express();


var createError =require('http-errors');
const fs =require('fs');
const path =require('path');
var cookieParser =require('cookie-parser');
var bodyParser =require('body-parser');
var morgan =require('morgan');
const favicon =require('serve-favicon');
const fileSize =1024 * 1000 * 2; //2MB

var winston =require('./config/winston');

const basedir =process.env.APP_BASEDIR;   

// log 

//app.use(morgan('dev' ,{ stream: log }));
/*
var morganbody =require('morgan-body');
var log = fs.createWriteStream( path.join(__dirname, './logs', "node-express4.log") , { flags: "a" } );

morganbody( app,
            { noColors: true,
              stream: log 
            });
*/

if (app.get('env') == 'production') {
    // You can set morgan to log differently depending on your environment
    //var log =fs.createWriteStream( path.join(basedir ,'./logs', 'http-app.log') ,{ flags: "a" } );
    app.use(morgan('common' ,{ stream: fs.createWriteStream( path.join(basedir ,'./logs', 'http-app.log') ,{ flags: "a" } )}));
} else {
    app.use(morgan('dev'));
}


//  view engine setup
var ejs =require('ejs');
app.set('views', path.join(basedir, '/views'));
app.set('view engine', 'ejs');

//  app static directory setup
app.use(express.static(path.join(basedir, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));
//app.locals.basedir =path.join(__dirname, 'public');

//  passport config
var passport =require('passport');
var expressSession =require('express-session');
app.use(expressSession({secret: process.env.SECRET_KEY, saveUninitialized: true, resave: true}));// Why Do we need this key ?
app.use(passport.initialize());
app.use(passport.session());

//  Initialize Passport
var passInit =require('./passport/passportInit');
passInit(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//  app uses
app.use(cookieParser());

// Automatically parses form data
app.use(express.json({limit: fileSize * 5}));
app.use(express.urlencoded({extended: false, limit: fileSize * 5}));

// routers
var indexRouter =require('./routes/index');
var homeRouter =require('./routes/home')(passport);

//
app.use('/', indexRouter );
app.use('/home', homeRouter);

// upload photos files
var multer =require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        winston.log('debug', 'multer.diskStorage');
        
        sess =req.session;
        
        let _uid =sess.user_uid;
        let _path =path.join(basedir, imageuploads, _uid + '/' );

        callback(null, _path );
    },
    filename: function (req, file, callback) {
        winston.log('debug', 'multer.filename');

        //console.log('req.body :', req.body);
        //console.log('req.body.photo_id :', req.body.photo_id);
        const __filename ='photo';
        let photo_id =req.body.photo_id; 
        let _filename = __filename + photo_id + path.extname(file.originalname);

        //console.log('_filename :', _filename);
        
        callback(null, _filename )
    }
})
var upload =multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        winston.log('debug', 'upload.fileFilter');
        
        let ext =path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback( new Error('Only (.png|.jpg|.jpeg) are allowed.'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: fileSize
    }
});


//  error handler
//  catch 404 and forward to error handler
//
app.use(function(req, res, next) {                  
  next(createError(404))
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message =err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    
    // 500 error page
    let fileName ='c:/nodejs/node-express4/views/error_500.html';
    
    // 404 error page
    if( err.status === 404 ) {
        fileName ='c:/nodejs/node-express4/views/error_404.html';
    };
    res.status(err.status || 500);
    res.set('Content-Type', "text/html; charset=utf-8");
    res.sendFile(fileName, null, function (err) {
        if (err) {
           //console.error('error :', err);
            next(err)
        }
    })
});

module.exports =app;