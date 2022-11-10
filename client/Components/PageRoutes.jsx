import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import NavigationBar from './NavigationBar.jsx'
import MasterView from '../Pages/MasterView.jsx'
import DepartmentPage from '../Pages/DepartmentPage.jsx'

// Set of routes for react to navigate between
export default function PageRoutes (props) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' replace />} />
      <Route path="/dashboard" element={<NavigationBar selected="Dashboard" />} />
      <Route path="/master-schedule" element={<MasterView selected="Master" />} />
      <Route path="/employee-schedule" element={<NavigationBar selected="Employee" />} />
      <Route path="/staff" element={<NavigationBar selected="Staff" />} />
      <Route path="/department" element={<DepartmentPage />} />
      <Route path="/settings" element={<NavigationBar selected="Settings" />} />
      <Route path="/login" element={<NavigationBar />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
