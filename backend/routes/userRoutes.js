const express = require('express')
const router = express.Router();
const {
    getUsers,
    getUserDetails,
    createUser,
    updateUserDetails,
    deleteUser,
    registerUser,
    loginUser,
    getLoggedInUserDetails
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware');

// router.get('/', (req, res) => {
//     getUsers(req, res);
// });

// router.get('/:userId', (req, res) => {
//     getUserDetails(req, res);
// })

// router.post('/', (req, res) => {
//     createUser(req, res);
// })

// router.put('/:userId', (req, res) => {
//     updateUserDetails(req, res);
// })

// router.delete('/:userId', (req, res) => {
//     deleteUser(req, res);
// })

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getLoggedInUserDetails)

module.exports = router;