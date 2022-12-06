// import React from 'react'
import React, { useState } from 'react'
// import PropTypes from 'prop-types'

import { Alert, AppBar, Button, ButtonGroup, Grid, Stack, Toolbar, Typography } from '@mui/material'
import { History, Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

/** Notes for Bottom Toolbar:
 * TODO: Add method to determine initial alert state inside export function based on what data is available from the DB.
 * TODO: Add timeout function to change state away from "saved successfully!" after a few seconds.
 * TODO: Make Discard button functional.
 * TODO: Add notification to be displayed whenever data fails to save.
 * TODO: Remove debug button group when the component is fully functional.
*/

// Component which comprises the bottom toolbar for the Shift View
// Contains an Alert bar, informing the user of relevant information
// and buttons to save and discard their changes
export default function ShiftViewToolbarBottom (props) {
  // Used to change the Save LoadingButton into a loading state when the changes are saving
  const [saving, setSaving] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('warning')
  const [alertText, setAlertText] = useState('There are no shifts for this day.')

  // These are used to test the Alert bar and its ability to change states.
  // These will be removed once the component is fully functional.
  const debugButtons = [
    <Button variant="contained" color="error" key="-1" onClick={() => {
      changeAlertState(-1)
    }}>-1</Button>,
    <Button variant="contained" color="error" key="X" onClick={() => {
      changeAlertState('X')
    }}>X</Button>,
    <Button variant="contained" key="0" onClick={() => {
      changeAlertState(0)
    }}>0</Button>,
    <Button variant="contained" key="1" onClick={() => {
      changeAlertState(1)
    }}>1</Button>,
    <Button variant="contained" key="2" onClick={() => {
      changeAlertState(2)
    }}>2</Button>,
    <Button variant="contained" key="3" onClick={() => {
      changeAlertState(3)
    }}>3</Button>,
    <Button variant="contained" key="4" onClick={() => {
      changeAlertState(4)
    }}>4</Button>
  ]

  /** changeAlertState
   * @description Changes alert icon, color, and text depending on changes and assignment status.
   * @param state Integer indicating the desired state of the alert. If this is not an integer, the Alert bar will display an error.
   ** Error states: -1, all non-integer inputs
   ** Normal states: 0, 1, 2, 3, 4
  */
  const changeAlertState = (state) => {
    if (state === -1) {
      setAlertSeverity('error')
      setAlertText('Failed to retrieve shift data.')
    } else if (state === 0) {
      setAlertSeverity('warning')
      setAlertText('There are no shifts for this day.')
    } else if (state === 1) {
      setAlertSeverity('success')
      setAlertText('All shifts have been assigned to a team member!')
    } else if (state === 2) {
      setAlertSeverity('warning')
      setAlertText('You have shifts which are not assigned to anyone!')
    } else if (state === 3) {
      setAlertSeverity('info')
      setAlertText('You have unsaved changes.')
    } else if (state === 4) {
      setAlertSeverity('success')
      setAlertText('Changes were saved successfully!')
      // TODO: Timeout for a few seconds, then switch to state 0 or 1.
    } else {
      setAlertSeverity('error')
      setAlertText('Invalid alert state.')
    }
  }
  return (
    <AppBar position="fixed" sx={{ bgcolor: '#ffffff', top: 'auto', bottom: 0 }}>
      <Toolbar disableGutters>
        <Grid container alignItems="center">
          <Grid item xs={ 6 }>
            <Alert severity={ alertSeverity }>
            <Typography noWrap>
              { alertText }
            </Typography>
            </Alert>
          </Grid>
          <Grid item xs={ 6 }>
            <Stack
              spacing={ 2 }
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <ButtonGroup aria-label="debug-alert-buttons">
                { debugButtons }
              </ButtonGroup>
              <Button
                // sx={{ height: 50 }}
                variant="outlined"
                aria-label="discard-button"
                color="error"
                startIcon={ <History /> }
              >
                <Typography noWrap>
                  Discard Changes
                </Typography>
              </Button>
              <LoadingButton
                // sx={{ height: 50 }}
                variant="contained"
                aria-label="save-button"
                color="success"
                startIcon={ <Save /> }
                loading={saving}
                // loadingIndicator="Saving..."
                loadingPosition="start"
                onClick={ () => setSaving(true) }
              >
                <Typography noWrap>
                  Save Changes
                </Typography>
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
