import React, { useEffect } from 'react'

import { Box, CircularProgress, Typography } from '@mui/material'

import { getDepartmentStaff } from '../dataHelper.js'
import NavigationBar from '../Components/NavigationBar.jsx'

export default function DepartmentPage (props) {
  const [departmentStaff, setDepartmentStaff] = React.useState([])

  const collectDepartmentStaff = () => {
    getDepartmentStaff()
      .then((response) => { setDepartmentStaff(response) })
      .catch((error) => {
        alert('Failed to retrieve department data')
        console.error(error)
      })
  }

  useEffect(() => {
    collectDepartmentStaff()
  }, [])

  if (!Array.isArray(departmentStaff) || departmentStaff.length < 1) {
    return (
      <React.Fragment>
        <NavigationBar selected="Department" />
        <Box height="100vh" display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress color='secondary' />
        </Box>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <NavigationBar selected="Department" />
      <Typography variant="h2" component="h2">
        Department
      </Typography>
    </React.Fragment>
  )
}
