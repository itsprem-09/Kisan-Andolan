const asyncHandler = require('express-async-handler');
const { appwriteClient } = require('../config/appwriteClient');
const { Account, ID } = require('node-appwrite');

const appwriteAccount = new Account(appwriteClient);

// @desc    Send OTP to a phone number
// @route   POST /api/otp/send
// @access  Public
const sendOtp = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body; // Expecting E.164 format, e.g., +911234567890

    if (!phoneNumber) {
        res.status(400);
        throw new Error('Phone number is required');
    }

    try {
        // Use ID.unique() to let Appwrite create a new user or use an existing one based on the phone number.
        // The `createPhoneToken` method will send an OTP to the provided phone number.
        // It returns a token object which includes the `userId`.
        const tokenResponse = await appwriteAccount.createPhoneToken(
            ID.unique(), 
            phoneNumber
        );

        // Send the userId back to the client. This userId is needed for the verification step.
        res.status(200).json({ 
            message: 'OTP sent successfully. Please check your phone.', 
            userId: tokenResponse.userId 
        });

    } catch (error) {
        console.error('Appwrite Send OTP Error:', error);
        // Appwrite errors often have a `code` and `message`.
        // If it's an Appwrite specific error, error.response might contain more details.
        let statusCode = 500;
        let message = 'Failed to send OTP. Please try again later.';

        if (error.code) { // Appwrite SDK error structure
            statusCode = error.code;
            message = error.message;
        } else if (error.response && error.response.data && error.response.data.message) { // Axios-like error structure sometimes seen
            statusCode = error.response.status || statusCode;
            message = error.response.data.message;
        } else if (error.message) {
            message = error.message;
        }
        
        res.status(statusCode).json({ message });
    }
});

// @desc    Verify OTP
// @route   POST /api/otp/verify
// @access  Public
const verifyOtp = asyncHandler(async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        res.status(400);
        throw new Error('User ID and OTP are required');
    }

    try {
        // The 'otp' from the user is the secret code they received.
        // Appwrite's updatePhoneSession method takes the userId and this secret (OTP code).
        const verificationResponse = await appwriteAccount.updatePhoneSession(userId, otp);

        // If successful, a session is created. The response contains session details.
        res.status(200).json({ 
            message: 'OTP verified successfully. Session created.', 
            userId: verificationResponse.userId, 
            sessionId: verificationResponse.$id 
            // You might want to fetch the user object here if you need to confirm phoneVerified status explicitly
            // const user = await appwriteAccount.get(); // Gets current session user
            // phoneVerified: user.phoneVerification
        });

    } catch (error) {
        console.error('Appwrite Verify OTP Error:', error);
        let statusCode = 500;
        let message = 'Failed to verify OTP. Please try again later.';

        if (error.code) { // Appwrite SDK error structure
            statusCode = error.code;
            message = error.message;
        } else if (error.response && error.response.data && error.response.data.message) { // Axios-like error structure
            statusCode = error.response.status || statusCode;
            message = error.response.data.message;
        } else if (error.message) {
            message = error.message;
        }

        res.status(statusCode).json({ message });
    }
});

module.exports = {
    sendOtp,
    verifyOtp,
};
