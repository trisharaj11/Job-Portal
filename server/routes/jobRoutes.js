import express from "express"
import { getJobById, getJobs } from "../controller/jobController.js";

const router=express.Router()

//routes to get all jobs data
router.get('/',getJobs)

//route to get a single job by ID
router.get('/:id',getJobById)

export default router;