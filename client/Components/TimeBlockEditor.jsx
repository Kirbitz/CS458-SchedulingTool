import * as React from 'react'
import { TextField, InputLabel, Select, MenuItem, FormControl, Button, Divider, Grid, Slide, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Paper } from '@mui/material'
import { History, DeleteForever } from '@mui/icons-material'

import PropTypes from 'prop-types'

import SaveAndNotify from './SaveAndNotify.jsx'
import TimeBlockInput from './TimeBlockInput.jsx'

import DeleteWarningPopup from './DeleteWarningPopup.jsx'
// import { timelineDotClasses } from '@mui/lab'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function TimeBlockEditor (props) {
  const [departments, setDepartments] = React.useState('')
  const [isModalOpen, setOpenModal] = React.useState(false)

  const handleChange = (event) => {
    setDepartments(event.target.value)
  }
  // openModal opens the warning modal by setting DeleteWarning display state to true
  const openModal = () => {
    setOpenModal(true)
  }

  const addTimeBlock = () => {
    console.log('addTimeBlock function was activated')
    timeData.push({
      timeStart: new Date(),
      timeEnd: new Date(),
      timeType: 2,
      positionName: 'Grill'
    })
    timeBlockComponents = timeData.map((timeBlock, index) => {
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

    // timeData is updating, but it is not visually updating
    console.log('added timeblock')
    console.log(timeData)
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
  let timeBlockComponents = timeData.map((timeBlock, index) => {
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
        <Typography variant="h4" component="div">Add/Edit Position</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <Typography variant="h6" component="div">Choose Department and Shift</Typography>
            <Paper>
              <Grid container>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mx: 2 }} />
                  <TextField fullWidth id="outlined-basic" label="Shiftname TextField" variant="outlined"/>
                </Grid>
                {/* To center an item like a button in a grid use sx={ textAlign: 'center'}; I know dumb */}
                <Grid item
                justifyContent={'center'}
                xs={12}
                sx={{ textAlign: 'center' }}>
                  <Divider sx={{ mx: 2 }} />
                  <Button
                  onClick={openModal}
                  value = {isModalOpen}
                  variant="contained"
                  color="error"
                  justifyContent='center'
                  >
                    <DeleteForever />
                    Delete position
                  </Button>
                </Grid>
              </Grid>
            <Divider sx={{ mx: 2 }} />
            <DeleteWarningPopup
            isOpen={isModalOpen}
            onClose={setOpenModal}
            />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={7}>
            <Typography variant="h6" component="div">Position TimeBlocks</Typography>
            <Paper variant="outlined">
              {timeBlockComponents}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button item xs={6}
        sm={7}
        onClick={addTimeBlock}>
          Add TimeBlock
          </Button>
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
