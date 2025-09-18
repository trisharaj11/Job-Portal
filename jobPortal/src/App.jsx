import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import DashBoard from './pages/DashBoard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />

      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />

        {/* Dashboard routes (protected by companyToken) */}
        {companyToken && (
          <Route path='/dashboard' element={<DashBoard />}>
            <Route path='add-job' element={<AddJob />} />
            <Route path='manage-job' element={<ManageJobs />} />
            <Route path='view-application' element={<ViewApplications />} />
          </Route>
        )}
      </Routes>
    </div>
  )
}

export default App
