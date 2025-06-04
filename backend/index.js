const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');

const dotenv = require('dotenv').config();
const port = process.env.PORT || 4000;

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/onthego/api/users', require('./routes/userRoutes'));
app.use('/onthego/api/posts', require('./routes/postRoutes'));

console.log('environment....', process.env.NODE_ENV);

app.listen(port, ()=>{
    console.log(`Hey, Server is running in port ${port}`);
})