import React from 'react'
import PropTypes from 'prop-types'

import { Alert, Snackbar } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Save } from '@mui/icons-material'

// Element that contains a save button and alert element for saving changes and notifying the user
export default function SaveAndNotify (props) {
  // callbackFunc is function to be ran when save is clicked
  // success determines the type of alert message to display to the user
  const { callbackFunc, disabled, success } = props

  // State for displaying the alert message to the user and for disabling the save button on click
  const [showSnack, setShowSnack] = React.useState(false)
  const [currentlyLoading, setCurrentlyLoading] = React.useState(false)

  // Handles the save button being clicked, running callbackFunc and showing snackbar
  const handleSave = () => {
    setCurrentlyLoading(true)
    if (callbackFunc) {
      callbackFunc()
    }
    setShowSnack(true)
  }

  // Handles enabling save button and hiding snackbar
  const handleClose = () => {
    setCurrentlyLoading(false)
    setShowSnack(false)
  }

  return (
    <React.Fragment>
      <LoadingButton
        data-testid='save-btn'
        variant="contained"
        color='success'
        onClick={handleSave}
        loading={currentlyLoading}
        loadingPosition="start"
        startIcon={<Save />}
        disabled={disabled}
      >
        Save
      </LoadingButton>
      <Snackbar open={showSnack} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert data-testid='alert-success-error' variant='filled' onClose={handleClose} severity={success ? 'success' : 'error'} sx={{ width: '100%' }}>
          {success ? 'Saved Changes!' : 'Failed To Save!'}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

// Validates the props being accepted into this element
SaveAndNotify.propTypes = {
  callbackFunc: PropTypes.func,
  disabled: PropTypes.bool,
  success: PropTypes.bool
}

// Sets the default value of the props if none are provided
SaveAndNotify.defaultProps = {
  callbackFunc: null,
  disabled: false,
  success: false
}
