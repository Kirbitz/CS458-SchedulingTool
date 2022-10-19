import React, { useEffect } from 'react'

import { Box, Button, CircularProgress, FormControl, IconButton, InputLabel, Select, TextField, Typography } from '@mui/material'
import { ArrowForward, ArrowBack, Create, PersonSearch } from '@mui/icons-material'

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
      <Typography variant="h3" component="h2" align='center' sx={{ mt: 2 }}>
        Department: The amazing department
      </Typography>
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <Button variant="contained" color='success'>Save</Button>
        <Box flexGrow={1} />
        <TextField id="employee-search" label="Employee Id/Name" variant="outlined" />
        <Button variant="contained" sx={{ mx: 1 }}>
          <PersonSearch />
        </Button>
        <Button variant="contained">
          <Create />
        </Button>
      </Box>
      <Box display='flex' justifyContent='space-between' sx={{ mt: 4 }}>
        <FormControl sx={{ width: 450 }}>
          <InputLabel shrink htmlFor="in-department">In Department</InputLabel>
          <Select
            multiple
            native
            height='100%'
            label="In Department"
            inputProps={{
              id: 'in-department'
            }}
          ></Select>
        </FormControl>
        <Box display='flex' sx={{ flexDirection: 'column' }}>
          <IconButton>
            <ArrowForward />
          </IconButton>
          <br />
          <IconButton>
            <ArrowBack />
          </IconButton>
        </Box>
        <FormControl sx={{ width: 450 }}>
          <InputLabel shrink htmlFor="not-in-department">Not In Department</InputLabel>
          <Select
            multiple
            native
            label="Not In Department"
            inputProps={{
              id: 'not-in-department'
            }}
          ></Select>
        </FormControl>
      </Box>
    </React.Fragment>
  )
}
