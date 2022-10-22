import React, { useEffect, useRef } from 'react'

import { Box, CircularProgress, Fab, TextField, Tooltip, Typography } from '@mui/material'
import { Create, PersonSearch } from '@mui/icons-material'

import NavigationBar from '../Components/NavigationBar.jsx'
import SaveAndNotify from '../Components/SaveAndNotify.jsx'
import DepAddRemoveFields from '../Components/DepAddRemoveFields.jsx'

const { getDepartmentInfo, postDepartmentInfo, searchEmployeeInfo } = require('../dataHelper.cjs')

export default function DepartmentPage (props) {
  const [departmentInfo, setDepartmentInfo] = React.useState(null)
  const [searchStaff, setSearchStaff] = React.useState([])
  const [dataCollected, setDataCollected] = React.useState(null)
  const [success, setSuccess] = React.useState(false)
  const [inputInvalid, setInputInvalid] = React.useState(false)
  const [searchHappened, setSearchHappened] = React.useState(true)
  const [searchClicked, setSearchClicked] = React.useState(false)

  const searchRef = useRef('')

  const searchEmployees = async () => {
    if (searchRef.current.value.length > 0 && (searchRef.current.value.match('^[0-9]+$') || searchRef.current.value.match('^[a-zA-Z]+$'))) {
      setInputInvalid(false)
      setSearchClicked(true)
      await searchEmployeeInfo(searchRef.current.value)
        .then((response) => { setSearchStaff(response) })
        .catch((error) => {
          alert('Failed to retrieve search data')
          console.error(error)
        })
      setSearchClicked(false)
      setSearchHappened(false)
    } else {
      setInputInvalid(true)
    }
  }

  const removeEmployees = (selectedUsers) => {
    setDepartmentInfo({
      depName: departmentInfo.depName,
      depEmployees: departmentInfo.depEmployees.filter((employee) => { return !selectedUsers.includes(employee.id) })
    })
  }

  const addEmployees = (selectedUsers) => {
    const temp = departmentInfo.depEmployees.concat(selectedUsers)
    setDepartmentInfo({
      depName: departmentInfo.depName,
      depEmployees: temp.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.id === value.id
        ))
      )
    })
  }

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

  useEffect(() => {
    collectDepartmentInfo()
  }, [])

  if (!dataCollected) {
    return (
      <Box data-testid='department-page'>
        <NavigationBar selected="Department" />
        <Typography variant="h3" component="h2" align='center' sx={{ mt: 2 }}>
          No Data Found
        </Typography>
      </Box>
    )
  }

  if (!departmentInfo || departmentInfo === undefined) {
    return (
      <Box data-testid='department-page'>
        <NavigationBar selected="Department" />
        <Box height="100vh" display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress color='secondary' />
        </Box>
      </Box>
    )
  }

  return (
    <Box data-testid='department-page'>
      <NavigationBar selected="Department" />
      <Typography variant="h3" component="h2" align='center' sx={{ mt: 2 }}>
        Department: {departmentInfo.depName}
      </Typography>
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <SaveAndNotify callbackFunc={updateDepartmentInfo} success={success} />
        <Box flexGrow={1} />
        <TextField error={inputInvalid} id="employee-search" label="Employee Id/Name" variant="outlined" inputRef={searchRef} />
        <Tooltip title="Search Employees">
          <div>
            <Fab disabled={searchClicked} color='primary' sx={{ mx: 1 }} onClick={searchEmployees}>
              <PersonSearch />
            </Fab>
          </div>
        </Tooltip>
        <Tooltip title="Create User">
          <div>
            <Fab disabled={searchHappened} color='secondary'>
              <Create />
            </Fab>
          </div>
        </Tooltip>
      </Box>
      <DepAddRemoveFields currentEmployees={departmentInfo.depEmployees} searchEmployees={searchStaff} removeEmployees={removeEmployees} addEmployees={addEmployees} />
    </Box>
  )
}
