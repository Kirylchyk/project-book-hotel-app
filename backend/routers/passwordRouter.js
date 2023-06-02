// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const mailjet = require('node-mailjet').connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);
//
// router.get('/test-password', (req, res) => {
//     res.status(200).json({ message: 'Test password route is working' });
// });
//
// const isEmailRegistered = async (email) => {
//     const user = await User.findOne({ email });
//     return !!user;
// };
//
// const generateRandomCode = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };
//
// const sendRecoveryEmail = async (email, code) => {
//     try {
//         console.log('Attempting to send recovery email to:', email);
//         const request = mailjet.post('send', { version: 'v3.1' }).request({
//             Messages: [
//                 {
//                     From: {
//                         Email: process.env.EMAIL_SENDER,
//                         Name: 'Your App Name',
//                     },
//                     To: [
//                         {
//                             Email: email,
//                         },
//                     ],
//                     Subject: 'Password Recovery',
//                     TextPart: `Your password recovery code is: ${code}`,
//                 },
//             ],
//         });
//         await request;
//         console.log('Recovery email sent:', email);
//     } catch (error) {
//         console.error('Error sending recovery email:', error);
//     }
// };
//
// router.post('/recover-password', async (req, res) => {
//     const { email } = req.body;
//
//     if (await isEmailRegistered(email)) {
//         const code = generateRandomCode();
//         await sendRecoveryEmail(email, code);
//
//         await User.updateOne({ email }, { $set: { recoveryCode: code } });
//
//         res.status(200).json({ message: 'Recovery email sent' });
//     } else {
//         res.status(404).json({ message: 'Email not found' });
//     }
// });
//
// module.exports = router;
