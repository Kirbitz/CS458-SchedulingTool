import React from 'react'
import PropTypes from 'prop-types'

import { Box, TextField, Tooltip, Grid } from '@mui/material'
import { ChangeCircle, Check, DeleteForever } from '@mui/icons-material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'

export default function TimeBlockInput (props) {
  const { timeBlockData } = props

  const [didChange, setDidChange] = React.useState(false)

  const removeTimeBlock = () => {
    console.log('removeTimeBlock function was activated')
  }

  return (
    <Box sx={{ m: 1 }}>
      <Grid container >
        <Grid item xs={10} >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          label='Start Time'
          value={timeBlockData.timeStart}
          onChange={(newTimeData) => {
            setDidChange(true)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label='End Time'
          value={timeBlockData.timeEnd}
          onChange={(newTimeData) => {
            setDidChange(true)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      </Grid>
      <Grid item xs={1} >
      <Tooltip title='Delete Time Block'>
        {/* <IconButton */}
          {/* color='error'
          size='medium'
          sx={{ border: 'solid 2px black' }} */}
        {/* > */}
          <DeleteForever onClick={removeTimeBlock} fontSize='large' color='error' />
        {/* </IconButton> */}
      </Tooltip>
      </Grid>
      <Grid item xs={1} >
      {
        didChange
          ? <ChangeCircle fontSize='medium' color='info' />
          : <Check fontSize='large' color='success' />
      }
      </Grid>
      </Grid>
    </Box>
  )
}

TimeBlockInput.propTypes = {
  timeBlockData: PropTypes.object.isRequired
}
