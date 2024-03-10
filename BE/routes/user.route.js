const express = require('express');
const userController = require('../controller/users.controller');
const { validateToken } = require('../utils/JWT');


const router = express.Router();

//ROUTES
router.post('/add-user',validateToken, userController.addUser);
router.post('/log-in', userController.loginUser);
router.get('/get-user-by-id', userController.getUserDataById);
router.get('/get-all-users', userController.getAllUsers);
router.put('/update-data', validateToken, userController.updateUserData);
router.delete('/delete-user', userController.deleteUser);


module.exports = router;