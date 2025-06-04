const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv').config();
const port = process.env.PORT || 4000;

connectDB();
app.use(cors({
    origin: 'https://onthego-frontend-itgq.onrender.com',
    headers: ["Content-Type"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
//app.options('*', cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/onthego/api/users', require('./routes/userRoutes'));
app.use('/onthego/api/posts', require('./routes/postRoutes'));

console.log('environment....', process.env.NODE_ENV);

app.listen(port, ()=>{
    console.log(`Hey, Server is running in port ${port}`);
})
