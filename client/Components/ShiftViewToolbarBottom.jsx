// import React from 'react'
import React, { useState } from 'react'
// import PropTypes from 'prop-types'

import { Alert, AppBar, Button, Grid, Stack, Toolbar } from '@mui/material'
import { History, Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

/** Notes for Bottom Toolbar:
 * TODO: Redisplay throbber on Save button when clicked.
 * TODO: Change formatting so buttons are the same height as the Alert field.
 * TODO: Add method to determine initial alert state inside export function based on what data is available from the DB.
 * TODO: Modify changeAlertState function to implement useState hook.
 */

let alertState = 0
let alertSeverity = 'warning'
let alertText = 'There are no shifts for this day.'

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
  if (state === -1) {
    alertSeverity = 'error'
    alertText = 'Failed to retrieve shift data.'
  } else if (state === 0) {
    alertSeverity = 'warning'
    alertText = 'There are no shifts for this day.'
  } else if (state === 1) {
    alertSeverity = 'success'
    alertText = 'All shifts have been assigned to a team member!'
  } else if (state === 2) {
    alertSeverity = 'warning'
    alertText = 'You have shifts which are not assigned to anyone!'
  } else if (state === 3) {
    alertSeverity = 'info'
    alertText = 'You have unsaved changes.'
  } else if (state === 4) {
    alertSeverity = 'success'
    alertText = 'Changes were saved successfully!'
    // Timeout for a few seconds, then switch to state 0 or 1.
  } else {
    alertSeverity = 'error'
    alertText = 'Invalid alert state.'
  }
}
/** Bottom toolbar for the Shift View.
 * Contains an Alert bar, informing the user of relevant information
 * and buttons to save and discard their changes.
*/
export default function ShiftViewToolbarBottom (props) {
  // Used to change the save LoadingButton into a loading state when the changes are saving
  const [saving, setSaving] = useState(false)
  alertState = 0

  return (
    <AppBar position="fixed" sx={{ bgcolor: '#ffffff', top: 'auto', bottom: 0 }}>
      <Toolbar disableGutters>
        <Grid container alignItems="flex-end">
          <Grid item xs={ 6 }>
            <Alert severity={alertSeverity}>{alertText}</Alert>
          </Grid>
          <Grid item xs={ 6 }>
            <Stack
              spacing={2}
              direction="row"
              alignItems="stretch"
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                aria-label="discard-button"
                color="error"
                startIcon={<History />}
              >
                Discard Changes
              </Button>
              <LoadingButton
                variant="contained"
                aria-label="save-button"
                color="success"
                startIcon={<Save />}
                loading={saving}
                loadingIndicator="Saving..."
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
/**
 * Leaving the full LoadingButton code here until package issues can be resolved
<LoadingButton
  variant="contained"
  aria-label="save-button"
  color="success"
  startIcon={<Save />}
  loading={saving}
  loadingIndicator="Saving..."
  onClick={() => setSaving(true)}
>
  Save Changes
</LoadingButton>
*/
