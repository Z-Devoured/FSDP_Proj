const express = require('express');
const router = express.Router();
const { User, Coupon, Sequelize } = require('../models');
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');

function generateCouponCode() {
    let code = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < 10; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  
    return code;
}

router.post("/", validateToken, async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        points: yup.number().min(1).required(),
        remarks: yup.string().trim().min(3).max(500).required()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.couponCode = generateCouponCode();
    data.remarks = data.remarks.trim();
    data.userId = req.user.id;
    let result = await Coupon.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition = {
            couponCode: {
                [Sequelize.Op.like]: `%${search}%`
            }
        };
    }

    let list = await Coupon.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        include: { model: User, as: "user", attributes: ['name'] }
    });
    res.json(list);
});


router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let coupon = await Coupon.findByPk(id, {
        include: { model: User, as: "user", attributes: ['name'] }
    });
    if (!coupon) {
        res.sendStatus(404);
        return;
    }
    res.json(coupon);
});

router.put("/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    let coupon = await Coupon.findByPk(id);
    if (!coupon) {
        res.sendStatus(404);
        return;
    }

    let userId = req.user.id;
    if (coupon.userId != userId) {
        res.sendStatus(403);
        return;
    }

    let data = req.body;
    let validationSchema = yup.object({
        points: yup.number().min(1).required(),
        remarks: yup.string().trim().min(3).max(500).required()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.remarks = data.remarks.trim();
    let num = await Coupon.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Coupon was updated successfully."
        });
    } else {
        res.status(400).json({
            message: `Cannot update coupon with id ${id}.`
        });
    }
});

router.delete("/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    let coupon = await Coupon.findByPk(id);
    if (!coupon) {
        res.sendStatus(404);
        return;
    }

    let userId = req.user.id;
    if (coupon.userId != userId) {
        res.sendStatus(403);
        return;
    }
    
    let num = await Coupon.destroy({
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Coupon was deleted successfully."
        });
    } else {
        res.status(400).json({
            message: `Cannot delete coupon with id ${id}.`
        });
    }
});


router.post("/redeem-coupon", validateToken, async (req, res) => {
    const { couponCode } = req.body;
    const userId = req.user.id;

    // Find the coupon by the provided code
    const coupon = await Coupon.findOne({ where: { couponCode } });
    if (!coupon) {
        return res.status(404).json({ error: 'Coupon not found.' });
    }

    // Check if the coupon has already been redeemed
    if (coupon.isRedeemed) {
        return res.status(400).json({ error: 'Coupon has already been redeemed.' });
    }

    // Update the user's points and the coupon's redeemed status
    try {
        const user = await User.findByPk(userId);
        user.points += coupon.points; // Make sure this logic aligns with your requirements
        await user.save();

        coupon.isRedeemed = true;
        await coupon.save();

        // Respond with a success message and updated points
        return res.json({ message: 'Coupon redeemed successfully.', points: user.points });
    } catch (error) {
        console.error("Error redeeming coupon:", error);
        return res.status(500).json({ error: 'An error occurred while redeeming the coupon.' });
    }
});

module.exports = router;