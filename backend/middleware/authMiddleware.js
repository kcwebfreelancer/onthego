const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res, next) => {
    let token;
    console.log("outside.....", req.headers)
    if (req.headers.authorization) {
        try {
            //Get token from headers
            token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();

        } catch (error) {
            console.log('error....', error)
            return res.status(401).json({ message: 'Not authorized' })
        }
    }
    console.log("token.....!!", token);
    if (!token) {
        console.log("inside")
        return res.status(401).json({ message: 'Not authorized, no token' })
    }

}

module.exports = { protect };