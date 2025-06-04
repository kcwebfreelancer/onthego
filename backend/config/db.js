const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        const conn = mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected...${(await conn).connection.host}`);
    } catch (error) {
        console.log(`MongoDB Error:::: ${error}`)
        process.exit();
    }
}

module.exports = connectDB;