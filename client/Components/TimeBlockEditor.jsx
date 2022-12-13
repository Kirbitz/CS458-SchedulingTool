import * as React from 'react'
import { Slide, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

import PropTypes from 'prop-types'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function TimeBlockEditor (props) {
  const { show, hideCallback } = props

  const handleClose = () => {
    if (hideCallback) {
      hideCallback()
    }
  }

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>Add Shift</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  )
}

TimeBlockEditor.propTypes = {
  show: PropTypes.bool,
  hideCallback: PropTypes.func
}

TimeBlockEditor.defaultProps = {
  show: false,
  hideCallback: null
}
