import React from 'react'

import { Grid, IconButton, Menu, Stack, Tooltip } from '@mui/material'
import { Delete, Edit, PersonOff } from '@mui/icons-material'

/** Notes for Shift:
 * TODO: Add employee assignment menu.
 * TODO: Create const objects for conflicting, unassigned, assigned, unsaved colors.
 * TODO: Change assignment menu button color upon state change.
 * TODO: Trigger state change in Alert bar on bottom toolbar when a change is made. (Karsten)
 * TODO: Disable text wrapping on first and second lines. (August)
 * TODO: Add tooltips to buttons. (August [Partially done, need Pull to round Out TopTooltip])
 */

export default function Shift (props) {
  const deptName = 'Department Name'
  const posName = 'Position Name'
  const startTime = '12:00 PM'
  const endTime = '4:00 PM'
  const employees = [
    'Abraham Abrahamsen',
    'Cindy Cindyson',
    'Erica Ericcson',
    'Joe Johnson',
    'Karlee Carlson'
  ]

  return (
    <Grid container alignItems="center">
    <Grid item xs={ 5 }>
      <Stack spacing={ 0 } noWrap>
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
        <Tooltip title = 'Unassign Shift'>
        <IconButton aria-label="unassign-button" disabled><PersonOff /></IconButton>
        </Tooltip>
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
/*
        <Menu
          aria-label="employee-menu"
          id="employee-menu"
        >

        </Menu>
*/
