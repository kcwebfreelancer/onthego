const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const getUsers = async (req, res) => {
    const users = await User.find()
    let output = {};
    output.users = users;
    return res.status(200).json(output);
}

const getUserDetails = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById({ "_id": userId });

    const output = {}
    output.user_details = user;
    return res.status(200).json(output);
}

const createUser = async (req, res) => {
    const { first_name, last_name, age } = req.body;

    if (!first_name || first_name.length === 0) {
        return res.status(400).json({ error: 'First name field should not be empty' });
    }
    if (!last_name || last_name.length === 0) {
        return res.status(400).json({ error: 'Last name field should not be empty' });
    }
    if (!age || age.length === 0) {
        return res.status(400).json({ error: 'Age field should not be empty' });
    }
    await User.create({
        first_name,
        last_name,
        age
    })

    return res.status(200).json({ message: 'User created successfully...!!!' });
}
const updateUserDetails = async (req, res) => {
    const userId = req.params.userId;
    const getUserId = await User.findById(req.params.userId);
    const id = getUserId._id;

    if (userId === id.toString()) {
        await User.findByIdAndUpdate(userId, req.body, { new: true });
    }
    if (!userId) {
        return res.status(400).json({ message: 'User Id is required in the params' });
    }
    return res.status(200).json({ message: `User details updated successfully for the user :: ${getUserId.first_name}` });
}
const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    await User.deleteOne({ "_id": userId });
    return res.status(200).json({ message: "User deleted successfully...!!!" });
}

const registerUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'All the fields are required' })
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' })
    }
    // Has Password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    //Create User in DB
    const user = await User.create({
        first_name,
        last_name,
        email,
        password: hasedPassword
    })
    if (user) {
        return res.status(200).json({
            message: 'User registered successfully !!!', user_details: {
                _id: user._id,
                name: user.first_name + ' ' + user.last_name,
                email: user.email,
                token: generateToken(user._id)
            }
        });
    } else {
        return res.status(400).json({ message: 'Invalid user data' })
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    //check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).json({
            message: 'Authentication is successful!!!',
            user_details: {
                _id: user._id,
                name: user.first_name + ' ' + user.last_name,
                email: user.email,
                token: generateToken(user._id)
            }
        });
    } else {
        return res.status(400).json({ message: 'Invalid credentials' })
    }

}

const getLoggedInUserDetails = async (req, res) => {
    const {_id, first_name, last_name, email} = await User.findById(req.user._id);
    return res.status(200).json({ user_details: {
        id: _id,
        first_name,
        last_name,
        email
    } });
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : '30d'});
}

module.exports = {
    getUsers,
    getUserDetails,
    createUser,
    updateUserDetails,
    deleteUser,
    registerUser,
    loginUser,
    getLoggedInUserDetails
}