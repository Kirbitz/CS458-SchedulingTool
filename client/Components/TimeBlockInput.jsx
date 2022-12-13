import React from 'react'
import PropTypes from 'prop-types'

import { Box, IconButton, TextField, Tooltip } from '@mui/material'
import { ChangeCircle, Check, DeleteForever } from '@mui/icons-material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'

export default function TimeBlockInput (props) {
  const { timeBlockData } = props

  const [didChange, setDidChange] = React.useState(false)

  return (
    <Box sx={{ m: 1 }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          label="Start Time"
          value={timeBlockData.timeStart}
          onChange={(newTimeData) => {
            setDidChange(true)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label="End Time"
          value={timeBlockData.timeEnd}
          onChange={(newTimeData) => {
            setDidChange(true)
          }}
          renderInput={(params) => <TextField sx={{ ml: 2 }} {...params} />}
        />
      </LocalizationProvider>
      <Tooltip title="Delete Time Block">
        <IconButton
          color="error"
          size="medium"
          sx={{ mx: 2 }}
        >
          <DeleteForever />
        </IconButton>
      </Tooltip>
      {
        didChange
          ? <ChangeCircle fontSize="large" color="info" />
          : <Check fontSize="large" color="success" />
      }
    </Box>
  )
}

TimeBlockInput.propTypes = {
  timeBlockData: PropTypes.object.isRequired
}
