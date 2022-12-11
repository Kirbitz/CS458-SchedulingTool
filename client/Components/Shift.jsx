import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material'
import { AutoDelete, Edit, PersonOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

/** Notes for Shift:
 * TODO: Create const objects for conflicting, unassigned, assigned, unsaved colors.
 * TODO: Change assignment menu button color upon state change.
 */

// Component to display shift information and provide access to tools for shift assignment and editing
export default function Shift (props) {
  let { deptName, posName, startTime, endTime, employees } = props

  //* This is dummy data and will be changed once prop data passing is complete.
  // deptName = 'Department Name'
  // posName = 'Position Name'
  // startTime = new Date()
  // endTime = new Date()

  // This array will remain but will be populated by data pulled from the database.
  //! The first option must always be the unassigned option as it is used by the Unassign button to determine its disabled status.
  /* employees = [
    'Abraham Abrahamsen',
    'Bob Robertson',
    'Cindy Cindyson',
    'Dick Dickenson',
    'Erica Ericcson',
    'Francisco Domingo Carlos Andres Sebastián d\'Anconia',
    'Joe Johnson',
    'Karlee Carlson',
    'Mark Marcussen',
    'Zoey Zimmerman'
  ] */
  //* End of dummy data

  // Adds an [unassigned] option to the beginning of the employees array
  employees = [].concat(['[unassigned]'], employees)

  // This function returns a time as a string in 12-hour format.
  function get12HourTime (date) {
    let minutes = date.getMinutes()

    // Conditional to prevent a single zero from being shown as opposed to two
    if (date.getMinutes() === 0) {
      minutes = '00'
    }

    if (date.getHours() > 12) {
      return ((date.getHours() - 12) + ':' + minutes + ' PM')
    } else if (date.getHours() === 12) {
      return ('12:' + minutes + ' PM')
    } else if (date.getHours() === 0) {
      return ('12:' + minutes + ' AM')
    } else {
      return ((date.getHours()) + ':' + minutes + ' AM')
    }
  }

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

  // The following variables, functions, and hooks are used for the confirmation dialog when a user tries to delete a time block.
  const [deleting, setDeleting] = useState(false)
  const [timeBlockWarningOpen, setTimeBlockWarningOpen] = useState(false)
  const handleTimeBlockWarningConfirm = () => {
    // TODO: Integrate this with backend.
    setDeleting(true)
  }

  return (
    <Grid container alignItems="center" data-testid='shift-root'>
      <Grid item xs={ 5 }>
        <Stack spacing={ 0 }>
          <Typography noWrap>
            <h3>{deptName}: {posName}</h3>
            <p>{get12HourTime(startTime)} to {get12HourTime(endTime)}</p>
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
                data-testid="employee-Unassignment-Button"
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
            data-testid='employee-Assignment-Button'
            // endIcon={ <KeyboardArrowDown /> }
              onClick={ handleClickListItem }
            sx={{ width: 250 }}
          >
            <Typography data-testid="assigned-person" noWrap>
              { employees[selectedIndex] }
            </Typography>
          </Button>
          <Menu
            data-testid='shift-menu'
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
                data-testid={`shift-menu-${index}`}
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
          <Tooltip title = 'Delete Time Block'>
            <IconButton
              aria-label="delete-time-block-button"
              onClick={() => { setTimeBlockWarningOpen(true) }}
            >
              <AutoDelete />
            </IconButton>
          </Tooltip>
        </Stack>
      </Grid>
      <Dialog
        aria-label="time-block-warning-dialog"
        open={timeBlockWarningOpen}
        onClose={() => { setTimeBlockWarningOpen(false) }}
      >
        <DialogTitle>Delete Time Block?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will delete only the time block, not the position itself.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={ 2 }
          >
            <LoadingButton
              variant="contained"
              color="error"
              startIcon={<AutoDelete/>}
              loading={deleting}
              loadingIndicator="Deleting..."
              onClick={handleTimeBlockWarningConfirm}
            >
              Delete
            </LoadingButton>
            <Button
              variant="outlined"
              disabled={deleting}
              onClick={() => { setTimeBlockWarningOpen(false) }}
              autoFocus
            >
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
// Checks that the props passed in match the correct type
Shift.propTypes = {
  deptName: PropTypes.string,
  posName: PropTypes.string,
  startTime: PropTypes.instanceOf(Date),
  endTime: PropTypes.instanceOf(Date),
  employees: PropTypes.array
}
// defaults the props to a set value if they are not required
Shift.defaultProps = {
  deptName: '[No Department Name]',
  posName: '[No Position Name]',
  startTime: new Date(),
  endTime: new Date(),
  employees: []
}
