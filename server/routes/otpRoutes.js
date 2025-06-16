const express = require('express');
const router = express.Router();
const {
    sendOtp,
    verifyOtp,
} = require('../controllers/otpController');

// @route   POST /api/otp/send
// @desc    Send OTP to a phone number
// @access  Public
router.post('/send', sendOtp);

// @route   POST /api/otp/verify
// @desc    Verify OTP
// @access  Public
router.post('/verify', verifyOtp);

module.exports = router;
