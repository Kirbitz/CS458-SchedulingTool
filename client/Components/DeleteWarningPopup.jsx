import React from 'react'
import PropTypes from 'prop-types'

import { Typography, Dialog, Button, Grid, Box } from '@mui/material'

const DeleteWarningPopup = ({ onClose, isOpen }) => {

  // const [warningPopupState, setPopupState] = React.useState()

  const handleClose = () => {
    console.log('handleClose was triggered')
    onClose(false)
    
  }
  return (
    <Dialog
    open={isOpen}
    onClose={handleClose}
    >
      <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <Typography 
        variant='h3' 
        color= 'error'>
          Warning
        </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography>
          This will delete the position and all associated timeblocks.
        </Typography>
        </Grid>
        <Grid item xs={6} >
        <Button 
        onClick={handleClose}
        variant='contained' 
        color='error'>Abort
        </Button>
        </Grid>
        <Grid item xs={6} justifyContent="center">
        <Button 
        onClick={handleClose}
        variant='contained' 
        color='success'>
          Continue
        </Button>
        </Grid>
      </Grid>      
    </Dialog>
  )
}

export default DeleteWarningPopup

DeleteWarningPopup.propTypes = {
  // right now this type is string because I don't know what it should be and we do not want eslint errors
  open: PropTypes.func

}
