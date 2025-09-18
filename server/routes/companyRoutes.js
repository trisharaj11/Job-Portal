import express from "express"
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedjobs, loginCompany, postJob, registercompany } from "../controller/companyController.js"
import upload from "../config/multer.js"
import { protectCompany } from "../middlewares/authMiddleware.js"

const router=express.Router()

//register a company
router.post('/register',upload.single('image'),registercompany)

//company login
router.post('/login',loginCompany)

//getCompanyData
router.get('/company',protectCompany,getCompanyData)

//post a job
router.post('/post-job',protectCompany,postJob)

//get applicants data of company
router.get('/applicants',protectCompany,getCompanyJobApplicants)

//get company job list
router.get('/list-jobs',protectCompany,getCompanyPostedjobs)

//change application status
router.post('/change-status',protectCompany,changeJobApplicationStatus)

//change application visibility
router.post('/change-visibility',protectCompany,changeVisibility)

export default router ;