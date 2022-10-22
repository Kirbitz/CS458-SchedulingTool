import React from 'react'
import PropTypes from 'prop-types'

import { Alert, Button, Snackbar } from '@mui/material'

export default function SaveAndNotify (props) {
  const { callbackFunc, success } = props

  const [showSnack, setShowSnack] = React.useState(false)
  const [disableButton, setDisableButton] = React.useState(false)

  // Handles the save button being clicked and showing snackbar
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
      <Button variant="contained" color='success' onClick={handleSave} disabled={disableButton}>Save</Button>
      <Snackbar open={showSnack} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert variant='filled' onClose={handleClose} severity={success ? 'success' : 'error'} sx={{ width: '100%' }}>
          {success ? 'Saved Changes!' : 'Failed To Save!'}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

SaveAndNotify.propTypes = {
  callbackFunc: PropTypes.func,
  success: PropTypes.bool
}

SaveAndNotify.defaultProps = {
  callbackFunc: null,
  success: false
}
