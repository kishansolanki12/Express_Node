const UserServices = require('../services/user.service');
const userService = new UserServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        let user = await userService.getUser({ email: req.body.email });
        if (user) {
            return res.json({ message: "User is already exist.." });
        }
        let hashpassword = await bcrypt.hash(req.body.password, 10);
        // console.log(hashpassword);
        user = await userService.addNewUser({ ...req.body, password: hashpassword });
        res.status(201).json({ user, message: "New User Register Successful..." });
    } catch (error) {
        console.log(error, "from registerUser controller");
        res.json({ message: "Internal server error" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        let user = await userService.getUser({ email: req.body.email, isDelete: false });
        // console.log(user);
        if (!user) {
            return res.json({ message: "User Not Found.." });
        }
        let comparepassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparepassword) {
            return res.json({ message: "Password Not Matched" });
        }
        let payLoad = {
            userId: user._id
        }
        // console.log("Payload is => ",payLoad);
        let token = jwt.sign(payLoad, 'Kishan');
        // console.log("Token is => ",token);
        res.status(201).json({ token, message: "Login Successfully.." });
    } catch (error) {
        console.log(error, "from loginUser controller");
        res.json({ message: "Internal server error" });
    }
};

exports.getProfile = async (req, res) => {
    try {
        let user = req.user;
        // console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.log(error, "from getProfile controller");
        res.json({ message: 'Internal Server Error ' })
    }
};

exports.updateUser = async (req, res) => {
    try {
        let user = await userService.getUserById(req.user._id);
        if (!user) {
            return res.json({ message: 'User is not found' });
        }
        user = await userService.updateUser(user._id, { ...req.body });
        res.json({ user, message: "User Update success!!!" });
    } catch (error) {
        console.log(error, "from updateUser controller");
        res.json({ message: 'Internal Server Error ' })
    }
};

exports.deleteUser = async (req, res) => {
    try {
        let user = await userService.getUserById(req.user._id);
        if (!user) {
            return res.json({ message: 'User is not found' });
        }
        user = await userService.updateUser(user._id, { isDelete: true });
        res.json({ message: "User delete success!!!" });
    } catch (error) {
        console.log(error, "from deleteUser controller");
        res.json({ message: 'Internal Server Error ' })
    }
};

exports.updatePassword = async (req, res) => {
    try {
       const userId = req.user._id;
       const { oldPassword, newPassword, confirmPassword } = req.body;
       let user = await userService.getUserById(userId);
       if (!user) {
          return res.json({ message: "User is not found.." });
       }
       const issamePassword = await bcrypt.compare(oldPassword, user.password);
       if (!issamePassword) {
          return res.json({ message: "Invalid old password" });
       };
       if(oldPassword == newPassword)
       {
          return res.json({message: "old password and new password are same "});
       }
       if (newPassword !== confirmPassword) {
          return res.json({ message: "New password and confirm password do not match" });
       };
       const hashedNewPassword = await bcrypt.hash(newPassword, 10);
       user = await userService.updateUser(userId, { password: hashedNewPassword });
       res.json({ message: "Password updated successfully!" });
    } catch (error) {
       console.log(error);
       res.json({ message: "Internal Server Error" });
    }
 };