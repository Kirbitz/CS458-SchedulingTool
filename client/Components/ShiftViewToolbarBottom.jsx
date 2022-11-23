// import React from 'react'
import React, { useState } from 'react'
// import PropTypes from 'prop-types'

import { Alert, AppBar, Button, ButtonGroup, Grid, Stack, Toolbar } from '@mui/material'
import { History, Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

/** Notes for Bottom Toolbar:
 * TODO: Add debug toolbar to test state change for Alert bar.
 * TODO: Add method to determine initial alert state inside export function based on what data is available from the DB.
 * TODO: Modify changeAlertState function to implement useState hook.
*/

/** Bottom toolbar for the Shift View.
 * Contains an Alert bar, informing the user of relevant information
 * and buttons to save and discard their changes.
*/
export default function ShiftViewToolbarBottom (props) {
  // let alertState = 0
  let alertSeverity = 'warning'
  let alertText = 'There are no shifts for this day.'

  // Used to change the save LoadingButton into a loading state when the changes are saving
  const [saving, setSaving] = useState(false)
  const [alertState, setAlertState] = useState(0)

  const debugButtons = [
    <Button key="-1" onClick={() => { changeAlertState(-1) }}>-1</Button>,
    <Button key="0" onClick={() => { changeAlertState(0) }}>0</Button>,
    <Button key="1" onClick={() => { changeAlertState(1) }}>1</Button>,
    <Button key="2" onClick={() => { changeAlertState(2) }}>2</Button>,
    <Button key="3" onClick={() => { changeAlertState(3) }}>3</Button>,
    <Button key="4" onClick={() => { changeAlertState(4) }}>4</Button>
  ]
  /** changeAlertState
   * @description Changes alert icon, color, and text depending on changes and assignment status.
   * @param state Integer indicating state of the alert
   * State -1: Failed to retrieve shift data.
   * State 0: There are no shifts for this day.
   * State 1: All shifts have been assigned to a team member.
   * State 2: You have shifts which are not assigned to anyone!
   * State 3: You have unsaved changes.
   * State 4: Changes were saved successfully!
  */
  const changeAlertState = (state) => {
    console.log("Current state is " + alertState)
    if (state === -1) {
      alertSeverity = 'error'
      alertText = 'Failed to retrieve shift data.'
      setAlertState(-1)
    } else if (state === 0) {
      alertSeverity = 'warning'
      alertText = 'There are no shifts for this day.'
      setAlertState(0)
    } else if (state === 1) {
      alertSeverity = 'success'
      alertText = 'All shifts have been assigned to a team member!'
      setAlertState(1)
    } else if (state === 2) {
      alertSeverity = 'warning'
      alertText = 'You have shifts which are not assigned to anyone!'
      setAlertState(2)
    } else if (state === 3) {
      alertSeverity = 'info'
      alertText = 'You have unsaved changes.'
      setAlertState(3)
    } else if (state === 4) {
      alertSeverity = 'success'
      alertText = 'Changes were saved successfully!'
      setAlertState(4)
      // Timeout for a few seconds, then switch to state 0 or 1.
    } else {
      alertSeverity = 'error'
      alertText = 'Invalid alert state.'
    }
    console.log("NEW state is " + alertState)
  }
  return (
    <AppBar position="fixed" sx={{ bgcolor: '#ffffff', top: 'auto', bottom: 0 }}>
      <Toolbar disableGutters>
        <Grid container alignItems="center">
          <Grid item xs={ 6 }>
            <Alert sx={{ height: 50 }} severity="warning">There are no shifts for this day.</Alert>
          </Grid>
          <Grid item xs={ 6 }>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <ButtonGroup aria-label="debug-alert-buttons">
                {debugButtons}
              </ButtonGroup>
              <Button
                // sx={{ height: 50 }}
                variant="outlined"
                aria-label="discard-button"
                color="error"
                startIcon={<History />}
              >
                Discard Changes
              </Button>
              <LoadingButton
                // sx={{ height: 50 }}
                variant="contained"
                aria-label="save-button"
                color="success"
                startIcon={<Save />}
                loading={saving}
                // loadingIndicator="Saving..."
                loadingPosition="start"
                onClick={() => setSaving(true)}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
