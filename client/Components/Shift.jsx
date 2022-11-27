import React from 'react'

import { Button, Grid, IconButton, Menu, MenuItem, Stack, Tooltip } from '@mui/material'
import { Delete, Edit, KeyboardArrowDown, PersonOff } from '@mui/icons-material'

/** Notes for Shift:
 * TODO: Add employee assignment menu.
 * TODO: Create const objects for conflicting, unassigned, assigned, unsaved colors.
 * TODO: Change assignment menu button color upon state change.
 * TODO: Make employee list scrollable.
 * TODO: Trigger state change in Alert bar on bottom toolbar when a change is made. (Karsten)
 * TODO: Disable text wrapping on first and second lines. (August)
 * TODO: Add tooltip to Unassign button. (Wrap in a span.) (August [Partially done, need Pull to round Out TopTooltip])
 *
 * ! Creating an onClick event for the Unassign button produces a "too many re-renders" error and crashes the page. Re-enabling the (unassigned) option in the menu for now.
 * TODO: Find out why this error is being called and fix.
 */

export default function Shift (props) {
  //* This is dummy data and will be deleted once prop data passing is complete.
  const deptName = 'Department Name'
  const posName = 'Position Name'
  const startTime = '12:00 PM'
  const endTime = '4:00 PM'

  //! The first option must always be the unassigned option for the Unassign button to work!
  const employees = [
    '[unassigned]',
    'Abraham Abrahamsen',
    'Cindy Cindyson',
    'Erica Ericcson',
    'Joe Johnson',
    'Karlee Carlson'
  ]

  // anchorEl is used to set the position of the menu relative to a particular element (in this case, the button).
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  //! The initial state of selectedIndex will need to be changed based on data brought in from the database. For now, it is 0.
  const [selectedIndex, setSelectedIndex] = React.useState(0)

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
        <p id="first-line">{deptName}: {posName}</p>
        <p id="second-line">{startTime} - {endTime}</p>
      </Stack>
    </Grid>
    <Grid item xs={ 7 }>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={ 2 }
      >
        <IconButton
          aria-label="unassign-button"
          id="unassign-button"
          disabled={ !selectedIndex }
          // onClick={setSelectedIndex(0)} //* Un-comment this line after the Unassign button issue is fixed.
        >
          <PersonOff />
        </IconButton>
        <Button
          aria-haspopup="true"
          aria-label="select-employee-button"
          id="select-employee-button"
          elevation={0}
          variant="contained"
          endIcon={<KeyboardArrowDown />}
          onClick={handleClickListItem}
          // sx={{ width: 150 }}
        >
          { employees[selectedIndex] }
        </Button>
        <Menu
          aria-label="employee-menu"
          id="employee-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
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
              key={employee}
              // disabled={index === 0} //* Un-comment this line after the Unassign button issue is fixed.
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {employee}
            </MenuItem>
          ))}
        </Menu>
        <Tooltip title = 'Edit Shift'>
          <IconButton aria-label="unassign-button"><Edit /></IconButton>
        </Tooltip>
        <Tooltip title = 'Delete Shift'>
          <IconButton aria-label="unassign-button"><Delete /></IconButton>
        </Tooltip>
      </Stack>
    </Grid>
    </Grid>
  )
}
