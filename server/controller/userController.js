//import { User } from "@clerk/express"
import { messageInRaw } from "svix"
import User from "../models/User.js"
import JobApplication from "../models/JobApplication.js"
import {v2 as cloudinary} from "cloudinary"
import Job from "../models/Job.js"

//get user data
export const getUserData=async(req,res)=>{
  const userId=req.auth.userId

  try {
    const user=await User.findById(userId)

    if(!user){
        return res.json({success:false,message:'User not found'})
    }
    res.json({success:true,user})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

//apply for a job
export const applyForJob=async(req,res)=>{
   const { jobId} =req.body

   const userId=req.auth.userId

   try {
    const isAlreadyApplied=await JobApplication.findOne({jobId,userId})
    if(isAlreadyApplied){
        return res.json({success:false,message:'Already applied'})
    }
    const jobData=await Job.findById(jobId)

    if(!jobData){
        return res.json({success:false,message:'Job Not found'})

    }
    await JobApplication.create({
        companyId:jobData.companyId,
        userId,
        jobId,
        date:Date.now()

    })
    res.json({success:true,message:'Applied Successfully'})
   } catch (error) {
     res.json({success:false,message:error.message})
   }
}

//fetch job application data for user or get user applied applicatons
export const getUserJobApplication=async(req,res)=>{
     try {
      const userId=req.auth.userId

      const application=await JobApplication.find({userId})
      .populate('userId','name email resume image')
      .populate('jobId','title description location category level salary')
      .exec()

      if(!application  || application.length === 0){
        return res.json({success:false,message:'No job applications found for this user!'})

      }
      return res.json({success:true,application})

     } catch (error) {
      res.json({success:false,message:error.messag })
      
     }
}

//update user profile
export const updateUserResume=async(req,res)=>{
  try {
    const userId=req.auth.userId

    const resumeFile=req.file

    const userData=await User.findById(userId)

    if(resumeFile){
      const resumeUpload=await cloudinary.uploader.upload(resumeFile.path)
      userData.resume=resumeUpload.secure_url
    }
    await userData.save()
    return res.json({success:true,message:'Resume Updated'})
  
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

