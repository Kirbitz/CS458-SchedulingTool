import React from 'react'
// import PropTypes from 'prop-types'

import { Button, Grid, IconButton, Stack } from '@mui/material'
import { Add, Close, FilterAlt } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

// TODO: Create Time Block Editor before enabling Add Shift button.
// TODO: Create Filter list before enabling Filter button.

export default function ShiftViewToolbarTop (props) {
  const navigate = useNavigate()
  // TODO: Validate date prop
  // const { date } = props
  return (
    <Grid container>
      <Grid item xs={ 4 }>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Button variant="contained" endIcon={<Add />} disabled>
            Add Shift
          </Button>
          {
          // TODO: Add date below after prop validation
          }
          <p>MM/DD/YYYY</p>
        </Stack>
      </Grid>
      <Grid item xs={ 4 }>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
            <Button sx={{ bgcolor: '#0b233f' }} variant="contained" endIcon={<FilterAlt />} disabled>
              Filter
            </Button>
        </Stack>
      </Grid>
      <Grid item xs={ 4 }>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <IconButton
            aria-label="close"
            onClick={() => {
              navigate('/master-schedule')
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  )
}
