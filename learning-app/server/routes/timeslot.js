const express = require('express');
const router = express.Router();
const { Timeslot, Sequelize } = require('../models');
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        location: yup.string().trim().min(3).max(500).required(),
        timeslot: yup.array().of(yup.string().required()).required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.location = data.location.trim();
    let result = await Timeslot.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { location: { [Sequelize.Op.like]: `%${search}%` } },
        ];
    }
    let list = await Timeslot.findAll({
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let timeslot = await Timeslot.findByPk(id);
    if (!timeslot) {
        res.sendStatus(404);
        return;
    }
    res.json(timeslot);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    let timeslot = await Timeslot.findByPk(id);
    if (!timeslot) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    let validationSchema = yup.object().shape({
        location: yup.string().trim().min(3).max(500),
        timeslot: yup.array().of(yup.string()),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.location = data.location.trim();
    let num = await Timeslot.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Timeslot was updated successfully."
        });
    } else {
        res.status(400).json({
            message: `Cannot update timeslot with id ${id}.`
        });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Timeslot.destroy({
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Timeslot was deleted successfully."
        });
    } else {
        res.status(400).json({
            message: `Cannot delete timeslot with id ${id}.`
        });
    }
});

module.exports = router;
