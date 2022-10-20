import React, { useEffect } from 'react'

import { Alert, Box, Button, CircularProgress, Fab, FormControl, IconButton, InputLabel, Select, Snackbar, TextField, Typography } from '@mui/material'
import { ArrowForward, ArrowBack, Create, PersonSearch } from '@mui/icons-material'

import { getDepartmentStaff } from '../dataHelper.js'
import NavigationBar from '../Components/NavigationBar.jsx'

export default function DepartmentPage (props) {
  const [departmentStaff, setDepartmentStaff] = React.useState([])
  const [showSnack, setShowSnack] = React.useState(false)
  const [disableButton, setDisableButton] = React.useState(false)
  const [dataCollected, setDataCollected] = React.useState(null)
  const [selectedUsers, setSelectedUsers] = React.useState([])

  const handleMultipleChange = (event) => {
    const { options } = event.target
    const value = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].key)
      }
    }
    setSelectedUsers(value)
  }

  const collectDepartmentStaff = () => {
    getDepartmentStaff()
      .then((response) => {
        setDepartmentStaff(response)
        setDataCollected(true)
      })
      .catch((error) => {
        alert('Failed to retrieve department data')
        console.error(error)
        setDataCollected(false)
      })
  }

  useEffect(() => {
    collectDepartmentStaff()
  }, [])

  // Handles the save button being clicked and showing snackbar
  const handleSave = () => {
    setDisableButton(true)
    setShowSnack(true)
  }

  // Handles enabling save button and hiding snackbar
  const handleClose = () => {
    setDisableButton(false)
    setShowSnack(false)
  }

  // if (!dataCollected) {
  //   return (
  //     <React.Fragment>
  //       <NavigationBar selected="Department" />
  //       <Typography variant="h3" component="h2" align='center' sx={{ mt: 2 }}>
  //         No Data Found
  //       </Typography>
  //     </React.Fragment>
  //   )
  // }

  // if (!Array.isArray(departmentStaff) || departmentStaff.length < 1) {
  //   return (
  //     <React.Fragment>
  //       <NavigationBar selected="Department" />
  //       <Box height="100vh" display='flex' justifyContent='center' alignItems='center'>
  //         <CircularProgress color='secondary' />
  //       </Box>
  //     </React.Fragment>
  //   )
  // }

  return (
    <React.Fragment>
      <NavigationBar selected="Department" />
      <Typography variant="h3" component="h2" align='center' sx={{ mt: 2 }}>
        Department: The amazing department
      </Typography>
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <Button variant="contained" color='success' onClick={handleSave} disabled={disableButton}>Save</Button>
        <Box flexGrow={1} />
        <TextField id="employee-search" label="Employee Id/Name" variant="outlined" />
        <Fab color='primary' sx={{ mx: 1 }}>
          <PersonSearch />
        </Fab>
        <Fab color='secondary'>
          <Create />
        </Fab>
      </Box>
      <Box display='flex' justifyContent='space-between' sx={{ mt: 4 }}>
        <FormControl sx={{ width: 450 }}>
          <InputLabel shrink htmlFor="in-department">In Department</InputLabel>
          <Select
            multiple
            native
            height='100%'
            label="In Department"
            value={selectedUsers}
            onChange={handleMultipleChange}
            inputProps={{
              id: 'in-department'
            }}
          >
            {names.map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </Select>
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
      <Snackbar open={showSnack} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert variant='filled' onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Saved Changes!
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

const names = [
  'Tyler Marefke',
  'Tyler Marefke',
  'Tyler Marefke',
  'Tyler Marefke',
  'Tyler Marefke',
  'Tyler Marefke',
  'Tyler Marefke'
]
