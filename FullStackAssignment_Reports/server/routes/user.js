const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const yup = require("yup");
const { sign } = require('jsonwebtoken');
require('dotenv').config();
const { validateToken } = require('../middlewares/auth');

router.post("/register,", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        name: yup.string().trim().matches(/^[a-z,.'-]+$/i)
            .min(3).max(50).required(),
        email: yup.string().trim().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required()
    })
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Hash password
    data.password = await bcrypt.hash(data.password, 10);
    //Create user
    let result = await User.create(data);
    res.json(result);

    //Trim string values
    data.name = data.name.trim();
    data.email = data.email.trim().toLowerCase();
    data.password = data.password.trim();

    //Check email
    let user = await User.findOne({
        where: { email: data.email }
    });
    if (user) {
        res.status(400).json({ message: "Email already exists." });
        return;
    }
});

router.post("/login", async (req, res) => {
    let data = req.body;
    //Validate request body
    let validationSchema = yup.object({
        name: yup.string().trim().matches(/^[a-z,.'-]+$/i)
            .min(3).max(50).required(),
        email: yup.string().trim().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required()
    });
    // Trim string values
    data.email = data.email.trim().toLowerCase();
    data.password = data.password.trim();
    // Check email and password
    let errorMsg = "Email or password is not correct.";
    let user = await User.findOne({
        where: { email: data.email }
    });
    if (!user) {
        res.status(400).json({ message: errorMsg });
        return;
    }
    let match = await bcrypt.compare(data.password, user.password);
    if (!match) {
        res.status(400).json({ message: errorMsg });
        return;
    }
    // Return user info
    let userInfo = {
        id: user.id,
        email: user.email,
        name: user.name
    };
    let accessToken = sign(userInfo, process.env.APP_SECRET);
    res.json({
        accessToken: accessToken,
        user: userInfo
    });
});

router.get("/auth", validateToken, (req, res) => {
    let userInfo = {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
    };
    res.json({
        user: userInfo
    });
});

module.exports = router;