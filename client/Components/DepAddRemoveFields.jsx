import React from 'react'
import PropTypes from 'prop-types'

import { Box, FormControl, IconButton, InputLabel, Select } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'

// Element display selection boxes for adding or removing employees from department
export default function DepAddRemoveFields (props) {
  const { addEmployees, currentEmployees, removeEmployees, searchEmployees } = props

  // State for tracking the selected users in each selection box
  const [selectedUsers, setSelectedUsers] = React.useState([])
  const [selectedAddUsers, setSelectedAddUsers] = React.useState([])

  // Handles the user selection in the in department box
  const handleMultipleChange = (event) => {
    const { options } = event.target
    const value = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    setSelectedUsers(value)
  }

  // Handles the user selection in the NOT in department box
  const handleMultipleChangeAdd = (event) => {
    const { options } = event.target
    const value = []
    const pos = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(searchEmployees[options[i].value])
        pos.push(options[i].value)
      }
    }
    setSelectedAddUsers(value)
    setSelectedUsers(pos)
  }

  // Function to run when remove arrow is clicked
  const callbackFuncRemove = () => {
    if (removeEmployees) {
      removeEmployees(selectedUsers)
    }
  }

  // Function to run when the add arrow is clicked
  const callbackFuncAdd = () => {
    if (addEmployees) {
      addEmployees(selectedAddUsers)
    }
  }

  return (
    <Box data-testid='dep-add-remove-fields' display='flex' justifyContent='space-between' sx={{ mt: 4 }}>
      <FormControl sx={{ width: 450 }}>
        <InputLabel shrink htmlFor="in-department">In Department</InputLabel>
        <Select
          data-testid="select-in-department"
          multiple
          native
          label="In Department"
          value={selectedUsers}
          onChange={handleMultipleChange}
          inputProps={{
            id: 'in-department'
          }}
        >
          <option disabled>Id &emsp;&emsp;&emsp;&nbsp; Name</option>
          {currentEmployees.map((employee) => (
          <option data-testid='option-in-department' key={employee.id} value={employee.id}>
              {employee.id} &nbsp; {employee.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Box display='flex' sx={{ flexDirection: 'column' }}>
        <IconButton data-testid='remove-btn' onClick={ callbackFuncRemove }>
          <ArrowForward />
        </IconButton>
        <br />
        <IconButton data-testid='add-btn' onClick={ callbackFuncAdd }>
          <ArrowBack />
        </IconButton>
      </Box>
      <FormControl sx={{ width: 450 }}>
        <InputLabel shrink htmlFor="not-in-department">Not In Department</InputLabel>
        <Select
          data-testid='select-not-in-department'
          multiple
          native
          label="Not In Department"
          value={selectedUsers}
          onChange={handleMultipleChangeAdd}
          inputProps={{
            id: 'not-in-department'
          }}
        >
          <option disabled>Id &emsp;&emsp;&emsp;&nbsp; Name</option>
          {searchEmployees.map((employee, index) => (
            <option data-testid='option-not-in-department' key={employee.id} value={index}>
              {employee.id} &nbsp; {employee.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

// Validates the props being accepted into this element
DepAddRemoveFields.propTypes = {
  removeEmployees: PropTypes.func,
  addEmployees: PropTypes.func,
  currentEmployees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })),
  searchEmployees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }))
}

// Sets the default value of the props if none are provided
DepAddRemoveFields.defaultProps = {
  currentEmployees: [],
  removeEmployees: null,
  addEmployees: null,
  searchEmployees: []
}
