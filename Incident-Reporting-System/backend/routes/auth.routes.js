const protectRoute = require('../middleware/auth.middleware.js');
const express = require('express');
const router = express.Router();
const {login, signup, reportIncident, viewReport, viewIncident, updateProfile, checkApproval, adminSignUp, getNotifications, logout, authoritySignUp} = require('../controllers/auth.controller.js');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // or another folder where you wish to store files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
const upload = multer({ storage });

router.post('/login', login);
router.post('/admin-signup', adminSignUp);
router.post('/authority-signup', authoritySignUp);
router.post('/logout', logout);
router.post('/signup', 
    upload.fields([
        { name: 'aadharCard', maxCount: 1 },
        { name: 'photo', maxCount: 1 },
      ]),
      signup
);
router.post('/check-approval', checkApproval);
router.post('/report-incident', protectRoute, upload.single('image'), reportIncident);
router.put('/update-profile', protectRoute, upload.single('profilePic'), updateProfile);
router.get('/notifications', protectRoute, getNotifications);
router.get('/view-incident/:id', protectRoute, viewIncident);
router.get('/view-report/:id', protectRoute, viewReport);

module.exports = router;