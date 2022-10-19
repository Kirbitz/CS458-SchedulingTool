import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import NavigationBar from './NavigationBar.jsx'
import Week from './Week.jsx'

// Set of routes for react to navigate between
export default function PageRoutes (props) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' replace />} />
      <Route path="/dashboard" element={<NavigationBar selected="Dashboard" />} />
      <Route path="/master-schedule" element={<Week selected="Master" />} />
      <Route path="/employee-schedule" element={<NavigationBar selected="Employee" />} />
      <Route path="/staff" element={<NavigationBar selected="Staff" />} />
      <Route path="/department" element={<NavigationBar selected="Department" />} />
      <Route path="/settings" element={<NavigationBar selected="Settings" />} />
      <Route path="/login" element={<NavigationBar />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
