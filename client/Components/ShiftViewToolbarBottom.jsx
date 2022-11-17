import React from 'react'
// import React, { useState } from 'react'
// import PropTypes from 'prop-types'

import { Alert, Button, Grid, Stack } from '@mui/material'
import { History, Save } from '@mui/icons-material'
// import { LoadingButton } from '@mui/lab'

/** Notes for Bottom Toolbar:
 * TODO: Refactor Save button to LoadingButton.
 */

/** Bottom toolbar for the Shift View.
 * Contains an Alert bar, informing the user of relevant information
 * and buttons to save and discard their changes.
*/
export default function ShiftViewToolbarBottom (props) {
  // Used to change the save LoadingButton into a loading state when the changes are saving
  // const [saving, setSaving] = useState(false)

  // Function Transform doesn't seem to work, comment til test confirmation

  // function transform(value) {
  //   return value <= 1 && value !== 0 ? '?{value * 100}%' : value
  // }

  return (
    <Grid container alignItems="flex-end">
      <Grid item xs={ 6 }>
        <Alert sx={{ height: 50 }} severity="warning">There are no shifts for this day.</Alert>
      </Grid>
      <Grid item xs={ 6 }>
        <Stack
          spacing={2}
          direction="row"
          alignItems="stretch"
          justifyContent="flex-end"
        >
          <Button
            sx={{ height: 50 }}
            variant="outlined"
            aria-label="discard-button"
            color="error"
            startIcon={<History />}
          >
            Discard Changes
          </Button>
          <Button
            sx={{ height: 50 }}
            variant="contained"
            aria-label="save-button"
            color="success"
            startIcon={<Save />}
            // ! Use of LoadingButton produces multiple build errors; talk to Marefke!
            // loading={saving}
            // loadingIndicator="Saving..."
            // onClick={() => setSaving(true)}
          >
            Save Changes
          </Button>
        </Stack>
      </Grid>
    </Grid>
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
