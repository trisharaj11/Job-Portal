import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import { toast } from "react-toastify";
import axios from "axios";
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useUser, useAuth } from '@clerk/clerk-react';
const Applications = () => {
  const {user}=useUser()
  const {getToken}=useAuth()
  const [isEdit, setisEdit] = useState(false)
  const [resume, setResume] = useState(null)
  const {backendURL,userData,userApplications,getUserApplicationsData, fetchUserData}=useContext(AppContext)

  const updateResume=async()=>{
       try {
        const formData=new FormData()
        formData.append('resume',resume)
        const token=await getToken()

        const {data}=await axios.post(backendURL+'/api/users/update-resume',
          formData,
          {headers:{Authorization:`Bearer ${token}`}}
        )
        if(data.success){
          toast.success(data.message)
          await fetchUserData()
          
        }
        else{
          toast.error(data.message)
        }
       } catch (error) {
         toast.error(error.message)
       }

       setisEdit(false)
       setResume(null)
  }

  useEffect(()=>{
    if(user){
      getUserApplicationsData()
    }
  },[user])
  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mt-6 mb-3'>
          {
            isEdit || userData && userData.resume ==="" 
            ? (
              <>
                <label className='flex items-center cursor-pointer' htmlFor='resumeUpload'>
                  <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name : "Select Resume"}</p>
                  <input
                    id='resumeUpload'
                    onChange={e => setResume(e.target.files[0])}
                    accept='application/pdf'
                    type='file'
                    hidden
                  />
                  <img src={assets.profile_upload_icon} alt="upload-icon" />
                </label>
                <button onClick={updateResume} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
              </>
            ) : (
              <div className='flex gap-2'>
                <a  className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href="">
                  Resume
                </a>
                <button onClick={() => setisEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>
                  Edit
                </button>
              </div>
            )
          }
        </div>

        <h2 className='text-xl mb-4 font-semibold'>Jobs Applied</h2>
        <div className="overflow-x-auto">
          <table className='min-w-full table-fixed bg-white border border-gray-200 rounded'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='py-3 px-4 border-b text-left leading-normal'>Company</th>
                <th className='py-3 px-4 border-b text-left leading-normal'>Job Title</th>
                <th className='py-3 px-4 border-b text-left leading-normal max-sm:hidden'>Location</th>
                <th className='py-3 px-4 border-b text-left leading-normal max-sm:hidden'>Date</th>
                <th className='py-3 px-4 border-b text-left leading-normal'>Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications?.map((job, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='py-3 px-4 border-b flex items-center gap-2 leading-normal align-middle'>
                    <img className='w-8 h-8 object-contain' src={job.companyId?.image} alt={job.company} />
                    <span>{job.companyId?.name}</span>
                  </td>
                  <td className='py-3 px-4 border-b leading-normal align-middle'>{job.jobId?.title}</td>
                  <td className='py-3 px-4 border-b leading-normal align-middle max-sm:hidden'>{job.jobId?.location}</td>
                  <td className='py-3 px-4 border-b leading-normal align-middle max-sm:hidden'>{moment(job.date).format('ll')}</td>
                  <td className='py-3 px-4 border-b leading-normal align-middle'>
                    <span className={`${job.status==='Accepted' ? 'bg-green-100' : job.status==='Rejected' ? 'bg-red-100' : 'bg-blue-100' } px-4 py-1.5 rounded`}>{job.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Applications
