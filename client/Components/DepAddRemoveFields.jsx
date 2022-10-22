import React from 'react'
import PropTypes from 'prop-types'

import { Box, FormControl, IconButton, InputLabel, Select } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'

export default function DepAddRemoveFields (props) {
  const { addEmployees, currentEmployees, removeEmployees, searchEmployees } = props

  const [selectedUsers, setSelectedUsers] = React.useState([])
  const [selectedAddUsers, setSelectedAddUsers] = React.useState([])

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

  const callbackFuncRemove = () => {
    if (removeEmployees) {
      removeEmployees(selectedUsers)
    }
  }

  const callbackFuncAdd = () => {
    if (addEmployees) {
      addEmployees(selectedAddUsers)
    }
  }

  return (
    <Box display='flex' justifyContent='space-between' sx={{ mt: 4 }}>
      <FormControl sx={{ width: 450 }}>
        <InputLabel shrink htmlFor="in-department">In Department</InputLabel>
        <Select
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
            <option key={employee.id} value={employee.id}>
              {employee.id} &nbsp; {employee.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Box display='flex' sx={{ flexDirection: 'column' }}>
        <IconButton onClick={ callbackFuncRemove }>
          <ArrowForward />
        </IconButton>
        <br />
        <IconButton onClick={ callbackFuncAdd }>
          <ArrowBack />
        </IconButton>
      </Box>
      <FormControl sx={{ width: 450 }}>
        <InputLabel shrink htmlFor="not-in-department">Not In Department</InputLabel>
        <Select
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
            <option key={employee.id} value={index}>
              {employee.id} &nbsp; {employee.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

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

DepAddRemoveFields.defaultProps = {
  currentEmployees: null,
  removeEmployees: null,
  addEmployees: null,
  searchEmployees: null
}
