import React from 'react'

import { IconButton, Grid, Stack } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'

export default function WeekChanger (props) {
  return (
    <Grid container mt={2} justifyContent="center">
      <Grid item>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            aria-label="previous-week"
          >
            <ArrowBack/>
          </IconButton>
          <p>MM/DD</p>
          <p> thru </p>
          <p>MM/DD</p>
          <IconButton
            aria-label="next-week"
          >
           <ArrowForward/>
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  )
}
