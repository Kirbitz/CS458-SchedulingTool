import React from 'react'
import PropTypes from 'prop-types'

import { Typography, Dialog, Button, Grid } from '@mui/material'

const DeleteWarningPopup = ({ onClose, isOpen }) => {
  const handleClose = () => {
    console.log('handleClose was triggered')
    onClose(false)
  }
  return (
    <Dialog
    open={isOpen}
    onClose={handleClose}
    >
      <Grid container
      justifyContent='center'
      alignItems='center'
      spacing={2}>
      <Grid item xs={4} sx={{ textAlign: 'center' }}
      >
        <Typography sx={{ textAlign: 'center' }}
        variant='h3'
        color= 'error'>
          Warning
        </Typography>
        </Grid>
        <Grid item xs={10} sx={{ p: 1, m: 1, textAlign: 'center' }}
        justifyContent='center'
        alignItems='center'>
        <Typography>
          This will delete the position and all associated timeblocks.
        </Typography>
        </Grid>
        <Grid item xs={3} sx={{ m: 1, p: 1, textAlign: 'center' }}
        justifyContent='center'
        alignItems='center'>
        <Button
        onClick={handleClose}
        variant='contained'
        color='error'>Abort
        </Button>
        </Grid>
        <Grid item xs={3} sx={{ m: 1, p: 1, textAlign: 'center' }}>
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
  open: PropTypes.func,
  onClose: PropTypes.bool,
  isOpen: PropTypes.bool

}
