import React from 'react'
import PropTypes from 'prop-types'

import { Alert, Button, Snackbar } from '@mui/material'

// Element that contains a save button and alert element for saving changes and notifying the user
export default function SaveAndNotify (props) {
  // callbackFunc is function to be ran when save is clicked
  // success determines the type of alert message to display to the user
  const { callbackFunc, success } = props

  // State for displaying the alert message to the user and for disabling the save button on click
  const [showSnack, setShowSnack] = React.useState(false)
  const [disableButton, setDisableButton] = React.useState(false)

  // Handles the save button being clicked, running callbackFunc and showing snackbar
  const handleSave = () => {
    setDisableButton(true)
    if (callbackFunc) {
      callbackFunc()
    }
    setShowSnack(true)
  }

  // Handles enabling save button and hiding snackbar
  const handleClose = () => {
    setDisableButton(false)
    setShowSnack(false)
  }

  return (
    <React.Fragment>
      <Button data-testid='save-btn' variant="contained" color='success' onClick={handleSave} disabled={disableButton}>Save</Button>
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
  success: PropTypes.bool
}

// Sets the default value of the props if none are provided
SaveAndNotify.defaultProps = {
  callbackFunc: null,
  success: false
}
