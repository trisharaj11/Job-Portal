import express from 'express';
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../controller/userController.js';
import upload from '../config/multer.js'
//import { requireAuth } from '@clerk/express';
const router=express.Router()

//get user data
router.get('/user',getUserData)

//apply for job router
router.post('/apply',applyForJob)

//get applied data
router.get('/applications',getUserJobApplication)

//resume update
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router;