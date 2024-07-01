const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
router.post("/create-user",
    [
        body('email').isEmail(),
        body('name').isAlpha(),
        body('password', 'incorrect password').isLength({ min: 5 })
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                location: req.body.location,
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post("/login",
    [
        body('email').isEmail(),
        body('password', 'incorrect password').isLength({ min: 5 })
    ],
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userdata = await User.findOne({ email });
            if (!userdata) {
                return res.status(400).json({ errors: "try logging in with correct credentials" });
            }
            if (req.body.password !== userdata.password) {
                return res.status(400).json({ errors: "try logging in with correct credentials" });
            }
            return res.json({ success: true });
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })
module.exports = router;