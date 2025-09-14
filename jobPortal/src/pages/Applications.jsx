import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'

const Applications = () => {
  const [isedit, setisEdit] = useState(false)
  const [resume, setResume] = useState(null)

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mt-6 mb-3'>
          {
            isedit ? (
              <>
                <label className='flex items-center cursor-pointer' htmlFor='resumeUpload'>
                  <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>Select Resume</p>
                  <input
                    id='resumeUpload'
                    onChange={e => setResume(e.target.files[0])}
                    accept='application/pdf'
                    type='file'
                    hidden
                  />
                  <img src={assets.profile_upload_icon} alt="upload-icon" />
                </label>
                <button onClick={() => setisEdit(false)} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
              </>
            ) : (
              <div className='flex gap-2'>
                <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href="">
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
              {jobsApplied.map((job, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='py-3 px-4 border-b flex items-center gap-2 leading-normal align-middle'>
                    <img className='w-8 h-8 object-contain' src={job.logo} alt={job.company} />
                    <span>{job.company}</span>
                  </td>
                  <td className='py-3 px-4 border-b leading-normal align-middle'>{job.title}</td>
                  <td className='py-3 px-4 border-b leading-normal align-middle max-sm:hidden'>{job.location}</td>
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
