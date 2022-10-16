import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import NavigationBar from './NavigationBar.jsx'

export default function PageRoutes (props) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' replace />} />
      <Route path="/dashboard" element={<NavigationBar current="Dashboard" />} />
      <Route path="/master-schedule" element={<NavigationBar current="Master" />} />
      <Route path="/employee-schedule" element={<NavigationBar current="Employee" />} />
      <Route path="/staff" element={<NavigationBar current="Staff" />} />
      <Route path="/department" element={<NavigationBar current="Department" />} />
      <Route path="/settings" element={<NavigationBar current="Settings" />} />
      <Route path="/login" element={<NavigationBar />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
