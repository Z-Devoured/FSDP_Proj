const express = require('express');
const router = express.Router();
const { Booking, Sequelize } = require('../models');
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        name: yup.string().trim().min(3).max(500).required(),
        amount: yup.number().min(1).max(500).required(),
        bookingStatus: yup.string().trim().min(3).max(100).required(),
        location: yup.string().trim().min(3).max(500).required(),
        timeslot: yup.string().trim().required(),
        chosendate: yup.date().required()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.name = data.name.trim();
    data.amount = data.amount;
    data.location = data.location.trim();
    data.timeslot = data.timeslot;
    data.bookingStatus = data.bookingStatus.trim();
    data.chosendate = data.chosendate;
    let result = await Booking.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { name: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }
    let list = await Booking.findAll({
        where:condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let booking = await Booking.findByPk(id);
    // Check id not found
    if (!booking) {
        res.sendStatus(404);
        return;
    }
    res.json(booking);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let booking = await Booking.findByPk(id);
    if (!booking) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        name: yup.string().trim().min(3).max(500),
        amount: yup.number().min(1).max(500),
        bookingStatus: yup.string().trim().min(3).max(500),
        location: yup.string().trim().min(3).max(500).required(),
        timeslot: yup.string().trim().required(),
        chosendate: yup.date().required()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.name = data.name.trim();
    data.amount = data.amount;
    data.bookingStatus = data.bookingStatus.trim();
    data.location = data.location.trim();
    data.timeslot = data.timeslot.trim();
    data.chosendate = data.chosendate;
    let num = await Booking.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Booking was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update Booking with id ${id}.`
        });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Booking.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Booking was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete Booking with id ${id}.`
        });
    }
});

module.exports = router;