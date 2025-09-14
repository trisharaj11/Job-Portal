import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
  return (
    <div className='container mx-auto p-6'>
      <div>
        <table className='w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow-sm'>
          <thead className='bg-gray-50'>
            <tr className='border-b'>
              <th className='py-3 px-6 text-left font-semibold text-gray-600'>#</th>
              <th className='py-3 px-6 text-left font-semibold text-gray-600'>User name</th>
              <th className='py-3 px-6 text-left font-semibold text-gray-600 max-sm:hidden'>Job Title</th>
              <th className='py-3 px-6 text-left font-semibold text-gray-600 max-sm:hidden'>Location</th>
              <th className='py-3 px-6 text-left font-semibold text-gray-600'>Resume</th>
              <th className='py-3 px-6 text-left font-semibold text-gray-600'>Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className='hover:bg-gray-50 transition'>
                <td className='py-3 px-6 border-b text-gray-700'>{index + 1}</td>
                <td className='py-3 px-6 border-b flex items-center gap-3 text-gray-700'>
                  <img
                    className='w-10 h-10 rounded-full'
                    src={applicant.imgSrc}
                    alt=""
                  />
                  <span>{applicant.name}</span>
                </td>
                <td className='py-3 px-6 border-b text-gray-700 max-sm:hidden'>{applicant.jobTitle}</td>
                <td className='py-3 px-6 border-b text-gray-700 max-sm:hidden'>{applicant.location}</td>
                <td className='py-3 px-6 border-b'>
                  <a
                    href=""
                    target="_blank"
                    className='bg-blue-50 text-blue-500 px-4 py-1 rounded-md inline-flex items-center gap-2 font-medium hover:bg-blue-100'
                  >
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='py-3 px-6 border-b'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 text-lg'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md group-hover:block'>
                      <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                      <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications
