import * as React from 'react'
import { ArrowDropDownIcon, Button, ButtonGroup, Divider, Grid, Slide, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Paper } from '@mui/material'
import { History } from '@mui/icons-material'

import PropTypes from 'prop-types'

import SaveAndNotify from './SaveAndNotify.jsx'
import TimeBlockInput from './TimeBlockInput.jsx'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function TimeBlockEditor (props) {
  const { show, hideCallback, timeBlocks } = props

  const timeData = [
    {
      timeStart: new Date(),
      timeEnd: new Date(),
      timeType: 2,
      positionName: 'Grill'
    },
    {
      timeStart: new Date(),
      timeEnd: new Date(),
      timeType: 2,
      positionName: 'Grill'
    },
    {
      timeStart: new Date(),
      timeEnd: new Date(),
      timeType: 2,
      positionName: 'Grill'
    },
    {
      timeStart: new Date(),
      timeEnd: new Date(),
      timeType: 2,
      positionName: 'Grill'
    },
    {
      timeStart: new Date(),
      timeEnd: new Date(),
      timeType: 2,
      positionName: 'Grill'
    },
    {
      timeStart: new Date(),
      timeEnd: new Date(),
      timeType: 2,
      positionName: 'Grill'
    },
    {
      timeStart: new Date(),
      timeEnd: new Date(),
      timeType: 2,
      positionName: 'Grill'
    }
  ]

  const handleClose = () => {
    if (hideCallback) {
      hideCallback()
    }
  }
  const timeBlockComponents = timeData.map((timeBlock, index) => {
    if (index === 0) {
      return (
        <TimeBlockInput key={index} timeBlockData={timeBlock} />
      )
    } else {
      return (
        <React.Fragment key={index}>
          <Divider sx={{ mx: 2 }} />
          {/* top */}
          <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
          {/* bottom */}
          <TimeBlockInput key={index} timeBlockData={timeBlock} />
        </React.Fragment>
      )
    }
  })

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={show}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <Typography variant="h4" component="div">Adding shift</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <Typography>Garbage Text</Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Typography variant="h6" component="div">Position TimeBlocks</Typography>
            <Paper variant="outlined">
              {timeBlockComponents}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          startIcon={<History />}
          onClick={handleClose}
        >
          Discard Changes
        </Button>
        <SaveAndNotify />
      </DialogActions>
    </Dialog>
  )
}

TimeBlockEditor.propTypes = {
  show: PropTypes.bool,
  hideCallback: PropTypes.func,
  timeBlocks: PropTypes.arrayOf(PropTypes.shape({
    timeId: PropTypes.Integer,
    timeStart: PropTypes.instanceOf(Date),
    timeEnd: PropTypes.instanceOf(Date),
    timeType: PropTypes.Integer,
    positionName: PropTypes.string
  })).isRequired
}

TimeBlockEditor.defaultProps = {
  show: false,
  hideCallback: null
}
