import * as React from 'react'
import { TextField, InputLabel, Select, MenuItem, FormControl, Button, Divider, Grid, Slide, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Paper } from '@mui/material'
import { History, DeleteForever } from '@mui/icons-material'

import PropTypes from 'prop-types'

import SaveAndNotify from './SaveAndNotify.jsx'
import TimeBlockInput from './TimeBlockInput.jsx'

import DeleteWarningPopup from './DeleteWarningPopup.jsx'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function TimeBlockEditor (props) {
  const [departments, setDepartments] = React.useState('')
  const [isModalOpen, setOpenModal] = React.useState(false)

  const handleChange = (event) => {
    setDepartments(event.target.value)
  }

  const openModal = () => {
    setOpenModal(true)
  }

  // old version with wimeBlocks; wanted the console erros to not be displaied
  // const { show, hideCallback, timeBlocks } = props
  const { show, hideCallback } = props

  // timeData is the array holding time blocks on the client side
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
    }
    // {
    //   timeStart: new Date(),
    //   timeEnd: new Date(),
    //   timeType: 2,
    //   positionName: 'Grill'
    // },
    // {
    //   timeStart: new Date(),
    //   timeEnd: new Date(),
    //   timeType: 2,
    //   positionName: 'Grill'
    // },
    // {
    //   timeStart: new Date(),
    //   timeEnd: new Date(),
    //   timeType: 2,
    //   positionName: 'Grill'
    // },
    // {
    //   timeStart: new Date(),
    //   timeEnd: new Date(),
    //   timeType: 2,
    //   positionName: 'Grill'
    // },
    // {
    //   timeStart: new Date(),
    //   timeEnd: new Date(),
    //   timeType: 2,
    //   positionName: 'Grill'
    // }
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
        <Typography variant="h4" component="div">Adding Position</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={departments}
              label="Department Name Dropdown"
              onChange={handleChange}
            >
              <MenuItem value={'Cybernetics'}>Cybernetics</MenuItem>
              <MenuItem value={'North Campus Cafe'}>North Campus Cafe</MenuItem>
              <MenuItem value={'Housing'}>Housing</MenuItem>
            </Select>
            </FormControl>
          <Divider sx={{ mx: 2 }} />
            <TextField id="outlined-basic" label="Shiftname TextField" variant="outlined"/>
            <Divider sx={{ mx: 2 }} />
            <Button
            onClick={openModal}
            value = {isModalOpen}
            variant="contained"
            color="error">
              <DeleteForever />
              Delete position
            </Button>
            <Divider sx={{ mx: 2 }} />
            <DeleteWarningPopup
            isOpen={isModalOpen}
            onClose={setOpenModal}
            />
          </Grid>
          <Grid item xs={6} sm={7}>
            <Typography variant="h6" component="div">Position TimeBlocks</Typography>
            <Button item xs={6} sm={7}>Add TimeBlock</Button>
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
