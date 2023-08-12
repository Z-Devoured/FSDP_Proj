const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const yup = require("yup");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/auth');

require('dotenv').config();


const saltRounds = 10;
const plainPassword = 'adminpassword01';

// First, check if the admin account already exists
User.findOne({ email: 'adminemail@gmail.com' })
    .then(user => {
        if(user) {
            console.log('Admin account already exists!');
            return;
        }
        
        // If no admin account is found, hash the password and create the account
        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
            if(err) {
                console.log("Error hashing password:", err);
                return;
            }
            
            User.create({
                email: 'adminemail@gmail.com',
                password: hashedPassword,
                name: 'admin01',
                points: 0,
                discount: 0,
                role: 'admin'  
            })
            .then(user => {
                console.log('Admin user created successfully');
            })
            .catch(err => {
                console.log(err);
            });
        });
    })
    .catch(err => {
        console.log("Error checking for admin user:", err);
    });


router.post("/register", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        name: yup.string().trim().matches(/^[a-z ,.'-]+$/i)
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

    // Trim string values
    data.name = data.name.trim();
    data.email = data.email.trim().toLowerCase();
    data.password = data.password.trim();

    // Check email
    let user = await User.findOne({
        where: { email: data.email }
    });
    if (user) {
        res.status(400).json({ message: "Email already exists." });
        return;
    }

    // Hash passowrd
    data.password = await bcrypt.hash(data.password, 10);
    data.role = 'user'; 
    // Create user
    let result = await User.create(data);
    res.json(result);
});

router.post("/login", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
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
        name: user.name,
        role: user.role 
    };
    let accessToken = sign(userInfo, process.env.APP_SECRET);
    res.json({
        accessToken: accessToken,
        user: userInfo
    });
});

router.get("/auth", validateToken, (req, res) => {
    try {

        let userInfo = {
            id: req.user.id,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role
        };


        res.json({
            user: userInfo
        });
    } catch (error) {
        console.error("Unexpected error in /user/auth route:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
  

router.get("/points", validateToken, async (req, res) => {
    const user = await User.findOne({
        where: { id: req.user.id },
        attributes: ['points', 'discount']
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
});


router.post("/redeem-discount", validateToken, async (req, res) => {
    const userId = req.user.id;
    const { percentage, cost } = req.body;

    try {
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (user.points < cost) {
            return res.status(400).json({ error: 'Not enough points to redeem this discount.' });
        }

        user.points -= cost; 
        user.discount = percentage; 
        await user.save();

        return res.json({ message: 'Discount redeemed successfully.', points: user.points });
    } catch (error) {
        console.error("Error redeeming discount:", error);
        return res.status(500).json({ error: 'An error occurred while redeeming the discount.' });
    }
});


router.post("/remove-discount", validateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        user.discount = 0; // Reset the discount field
        await user.save();

        return res.json({ message: 'Discount removed successfully.' });
    } catch (error) {
        console.error("Error removing discount:", error);
        return res.status(500).json({ error: 'An error occurred while removing the discount.' });
    }
});


router.get("/all-users", validateToken, async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "name", "email", "points", "discount"] 
        });
        return res.json(users);
    } catch (error) {
        console.error("Error fetching all users:", error);
        return res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
});


router.delete('/remove/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        await user.destroy();

        res.status(200).send({ message: "User removed successfully." });
    } catch (error) {
        console.error("Error removing user:", error);
        res.status(500).send({ message: "Failed to remove user." });
    }
});


module.exports = router;
