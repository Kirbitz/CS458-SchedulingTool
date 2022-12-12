import * as React from 'react'
import {
  AppBar, Button, Typography, Toolbar,
  Box, Container, Alert, CloseIcon, IconButton, Dialog, Slide
} from '@mui/material'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function TimeBlockEditor (props) {
  const { open, setOpen } = React.useState(false)

  const handleClickOpen = () => {
    setOpen=(true)
  }

  const handleClose = () => {
    setOpen=(false)
  }
  const { show, hideCallback } = props
  return (
    <div>
    <Button variant="outlined" onClick={handleClickOpen}>
      Open TimeBlock Editor
    </Button>
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}>
          <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
    </Dialog>
    </div>
  )
}
