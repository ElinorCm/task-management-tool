require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors'); 
const multer  = require('multer');
const router = require('./app/router');
const userMiddleware = require('./app/middlewares/user');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './app/views');

const upload = multer();
app.use(upload.none());

app.use(express.urlencoded({ extended : true }));
app.use(express.json());

app.use(session({
   saveUninitialized: true, 
   resave: true, 
   secret: process.env.SESSION_SECRET || 'Change Me !' 
}));

app.use(userMiddleware);

//app.use(cors({
  // origin:"http://localhost:4000"
// }));

app.use(cors('*')); 

app.use(router);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});