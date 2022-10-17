import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import NavigationBar from './NavigationBar.jsx'

export default function PageRoutes (props) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' replace />} />
      <Route path="/dashboard" element={<NavigationBar currentlySelected="Dashboard" />} />
      <Route path="/master-schedule" element={<NavigationBar currentlySelected="Master" />} />
      <Route path="/employee-schedule" element={<NavigationBar currentlySelected="Employee" />} />
      <Route path="/staff" element={<NavigationBar currentlySelected="Staff" />} />
      <Route path="/department" element={<NavigationBar currentlySelected="Department" />} />
      <Route path="/settings" element={<NavigationBar currentlySelected="Settings" />} />
      <Route path="/login" element={<NavigationBar />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
