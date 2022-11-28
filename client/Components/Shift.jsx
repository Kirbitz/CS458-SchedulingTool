import React, { useState } from 'react'

import { Button, Grid, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material'
import { Delete, Edit, PersonOff } from '@mui/icons-material'

/** Notes for Shift:
 * TODO: Create const objects for conflicting, unassigned, assigned, unsaved colors.
 * TODO: Change assignment menu button color upon state change.
 * TODO: Make employee list scrollable.
 */

// Component to display shift information and provide access to tools for shift assignment and editing
export default function Shift (props) {
  //* This is dummy data and will be changed once prop data passing is complete.
  const deptName = 'Department Name'
  const posName = 'Position Name'
  const startTime = '12:00 PM'
  const endTime = '4:00 PM'

  // This array will remain but will be populated by data pulled from the database.
  //! The first option must always be the unassigned option as it is used by the Unassign button to determine its disabled status.
  const employees = [
    '[unassigned]',
    'Abraham Abrahamsen',
    'Bob Robertson',
    'Cindy Cindyson',
    'Erica Ericcson',
    'Francisco Domingo Carlos Andres Sebastián d\'Anconia',
    'Joe Johnson',
    'Karlee Carlson',
    'Mark Marcussen',
    'Zoey Zimmerman'
  ]
  //* End of dummy data

  // anchorEl is used to set the position of the menu relative to a particular element (in this case, the button).
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  // selectedIndex is used to determine which of the available employees is selected by the user.
  //! The initial state of selectedIndex will need to be changed based on data brought in from the database. For now, it is 0.
  const [selectedIndex, setSelectedIndex] = useState(0)

  // These three functions are used to control application focus during menu interactions.
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Grid container alignItems="center">
      <Grid item xs={ 5 }>
        <Stack spacing={ 0 }>
          <Typography noWrap>
            <p id="first-line">{deptName}: {posName}</p>
            <p id="second-line">{startTime} - {endTime}</p>
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={ 7 }>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={ 2 }
        >
          <Tooltip title = 'Unassign Employee'>
            <span>
              <IconButton
                aria-label="unassign-button"
                id="unassign-button"
                disabled={ !selectedIndex }
                onClick={ () => { setSelectedIndex(0) } }
              >
                <PersonOff />
              </IconButton>
            </span>
          </Tooltip>

          <Button
            aria-haspopup="true"
            aria-label="select-employee-button"
            id="select-employee-button"
            elevation={ 0 }
            variant="contained"
            // endIcon={ <KeyboardArrowDown /> }
            onClick={ handleClickListItem }
            sx={{ width: 250 }}
          >
            <Typography noWrap>
              { employees[selectedIndex] }
            </Typography>
          </Button>
          <Menu
            aria-label="employee-menu"
            id="employee-menu"
            anchorEl={ anchorEl }
            open={ open }
            onClose={ handleClose }
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              horizontal: 'right'
            }}
          >
            {employees.map((employee, index) => (
              <MenuItem
                key={ employee }
                // disabled={ index === 0 }
                selected={ index === selectedIndex }
                onClick={ (event) => { handleMenuItemClick(event, index) } }
              >
                {employee}
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title = 'Edit Shift'>
            <IconButton aria-label="edit-shift-button"><Edit /></IconButton>
          </Tooltip>
          <Tooltip title = 'Delete Shift'>
            <IconButton aria-label="delete-shift-button"><Delete /></IconButton>
          </Tooltip>
        </Stack>
      </Grid>
    </Grid>
  )
}
