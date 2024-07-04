const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "mynameisshreeyaverma";

router.post("/login-user",
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
            const pwdCompare = await bcrypt.compare(req.body.password, userdata.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "try logging in with correct credentials" });
            }

            const data = {
                user: {
                    id: userdata.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken });
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;