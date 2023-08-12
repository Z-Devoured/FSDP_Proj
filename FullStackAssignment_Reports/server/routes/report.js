const express = require('express');
const router = express.Router();
const { Report, Sequelize, sequelize } = require('../models');
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        cust_name: yup.string().trim().min(3).max(100).required(),
        description: yup.string().trim().min(3).max(500).required(),
        report_id: yup.string().trim(),
        severity: yup.string().trim().required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.cust_name = data.cust_name.trim();
    data.description = data.description.trim();
    data.report_id = data.report_id.trim();
    data.severity = data.severity.trim();
    let result = await Report.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { cust_name: { [Sequelize.Op.like]: `%${search}%` } },
            { description: { [Sequelize.Op.like]: `%${search}%` } },
            { report_id: { [Sequelize.Op.like]: `%${search}%` } },
            { severity: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }

    let list = await Report.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let report = await Report.findByPk(id);
    // Check id not found
    if (!report) {
        res.sendStatus(404);
        return;
    }
    res.json(report);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let report = await Report.findByPk(id);
    if (!report) {
        res.sendStatus(404);
        return;
    }

    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        cust_name: yup.string().trim()
            .min(3, 'Customer Name must be at least 3 characters')
            .max(100, 'Customer Name must be at most 100 characters')
            .required('Customer Name is required'),
        description: yup.string().trim()
            .min(3, 'Description must be at least 3 characters')
            .max(100, 'Description must be at most 100 characters')
            .required('Description is required'),
        report_id: yup.string().trim(),
        severity: yup
            .string()
            .required('Severity is required')
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.cust_name = data.cust_name.trim();
    data.description = data.description.trim();
    data.report_id = data.report_id.trim();
    data.severity = data.severity.trim();
    let num = await Report.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Report was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update report with id ${id}.`
        });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let report = await Report.findByPk(id);
    if (!report) {
        res.sendStatus(404);
        return;
    }

    let num = await Report.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Report was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete report with id ${id}.`
        });
    }
});

module.exports = router;