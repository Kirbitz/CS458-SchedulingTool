import React, { useEffect, useRef } from 'react'

import { Box, CircularProgress, Fab, TextField, Tooltip, Typography } from '@mui/material'
import { Create, PersonSearch } from '@mui/icons-material'

import NavigationBar from '../Components/NavigationBar.jsx'
import SaveAndNotify from '../Components/SaveAndNotify.jsx'
import DepAddRemoveFields from '../Components/DepAddRemoveFields.jsx'

import { getDepartmentInfo, postDepartmentInfo, searchEmployeeInfo } from '../dataHelper.js'
import Register from '../Components/RegisterModal.jsx'

// Department Page that will display information for adding or removing employees from their department
export default function DepartmentPage (props) {
  // State management for current department employees and search employees
  const [departmentInfo, setDepartmentInfo] = React.useState(null)
  const [searchStaff, setSearchStaff] = React.useState([])
  // State management for successful initial collection of the department data
  const [dataCollected, setDataCollected] = React.useState(-1)
  // State management for successful department info update
  const [success, setSuccess] = React.useState(false)
  // State management for search validity and disabled/enable search and create user buttons
  const [inputInvalid, setInputInvalid] = React.useState(false)
  const [searchHappened, setSearchHappened] = React.useState(true)
  const [searchClicked, setSearchClicked] = React.useState(false)
  // State management for open and close register modal
  const [registerOpen, setRegisterOpen] = React.useState(false)
  // Reference for checking data that is added to the search field
  const searchRef = useRef('')
  const inputChange = () => {
    if (searchRef.current.value.length > 0 && (searchRef.current.value.match('^[0-9]+$') || searchRef.current.value.match('^[a-zA-Z]+( [a-zA-Z]+)*$'))) {
      setInputInvalid(false)
    } else {
      setInputInvalid(true)
    }
  }

  // Search employees function for find employees of a user query (query has to either be numeric XOR alpha)
  const searchEmployees = async () => {
    // Checks that the search properly meets the validation requirements
    // Validation Requirements: Box Contains Value and Value is either numeric XOR alpha chars
    if (!inputInvalid && searchRef.current.value.length > 0) {
      // Disables the search button to prevent multiple clicks
      setSearchClicked(true)
      // search function for finding data related to entered search value
      await searchEmployeeInfo(searchRef.current.value)
        .then((response) => { setSearchStaff(response) })
        .catch((error) => {
          alert('Failed to retrieve search data')
          console.error(error)
        })
      // Re-enables search button and enables the create user button
      setSearchClicked(false)
      setSearchHappened(false)
    }
  }

  // Function to run for temp removing employees from a department
  const removeEmployees = (selectedUsers) => {
    setDepartmentInfo({
      depName: departmentInfo?.depName,
      depEmployees: departmentInfo?.depEmployees?.filter((employee) => { return !selectedUsers.includes(employee.id) })
    })
  }

  // Function to run for temp adding employees from a department
  const addEmployees = (selectedUsers) => {
    const temp = departmentInfo?.depEmployees?.concat(selectedUsers)
    setDepartmentInfo({
      depName: departmentInfo?.depName,
      depEmployees: temp?.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.id === value.id
        ))
      )
    })
  }

  // Function for collecting the information of the current employees in the department
  const collectDepartmentInfo = () => {
    getDepartmentInfo()
      .then((response) => {
        setDepartmentInfo(response)
        setDataCollected(true)
      })
      .catch((error) => {
        alert('Failed to retrieve department data')
        console.error(error)
        setDataCollected(false)
      })
  }

  // Function to run when user wants to save their temp updates
  const updateDepartmentInfo = () => {
    postDepartmentInfo(departmentInfo)
      .then(() => {
        setSuccess(true)
      })
      .catch((error) => {
        console.error(error)
        setSuccess(false)
      })
  }

  // Runs the collectDepartmentInfo function exactly one time when the component is rendered
  useEffect(() => {
    collectDepartmentInfo()
  }, [])

  // Renders this data if the collectDepartmentInfo failed to retrieve anything
  // if (!dataCollected) {
  //   return (
  //     <Box data-testid='department-page'>
  //       <NavigationBar selected="Department" />
  //       <Typography variant="h3" component="h2" align='center' sx={{ mt: 2 }}>
  //         No Data Found
  //       </Typography>
  //     </Box>
  //   )
  // }

  // Runs a loading wheel to indicate that data is being fetched
  // if (!departmentInfo || departmentInfo === undefined) {
  //   return (
  //     <Box data-testid='department-page'>
  //       <NavigationBar selected="Department" />
  //       <Box height="100vh" display='flex' justifyContent='center' alignItems='center'>
  //         <CircularProgress color='secondary' />
  //       </Box>
  //     </Box>
  //   )
  // }

  // This function will close the register modal
  const handleRegistrationClose = () => {
    setRegisterOpen(false)
  }

  // This function will open the register modal
  const handleRegistrationOpen = () => {
    setRegisterOpen(true)
  }

  // Renders once departmentInfo has been fetched
  return (
    <Box data-testid='department-page'>
      <NavigationBar selected="Department" />
      <Typography variant="h3" component="h2" align='center' sx={{ mt: 2 }}>
        Department: {departmentInfo?.depName}
      </Typography>
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <SaveAndNotify callbackFunc={updateDepartmentInfo} success={success} />
        <Box flexGrow={1} />
        <TextField
          data-testid='search-field'
          error={inputInvalid}
          id="employee-search"
          inputRef={searchRef}
          label="Employee Id/Name"
          name={searchRef.current.value}
          type="search"
          variant="outlined"
          onChange={inputChange}
        />
        <Tooltip title="Search Employees">
          <div>
            <Fab data-testid='search-btn' disabled={searchClicked} color='primary' sx={{ mx: 1 }} onClick={searchEmployees}>
              <PersonSearch />
            </Fab>
          </div>
        </Tooltip>
        <Tooltip title="Create User">
          <div>
            <Fab onClick={handleRegistrationOpen} data-testid='create-btn' disabled={searchHappened} color='secondary'>
              <Create />
            </Fab>
          </div>
        </Tooltip>
      </Box>
      <DepAddRemoveFields currentEmployees={departmentInfo?.depEmployees} searchEmployees={searchStaff} removeEmployees={removeEmployees} addEmployees={addEmployees} />
      <Register handleClose={handleRegistrationClose} open={registerOpen} />
    </Box>
  )
}
