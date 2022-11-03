import React from 'react'

import NavigationBar from '../Components/NavigationBar.jsx'
import Week from '../Components/Week.jsx'
import WeekChanger from '../Components/WeekChanger.jsx'

import { Box, Grid, Toolbar } from '@mui/material'

// import { PersonRoundedIcon } from '@mui/icons-material/PersonRounded'

// const dateData = [{ weekday: 'Monday', date: 23 }]
// Week component for the master schedule view

export default function MasterView (props) {
  return (
  // TODO Month label
  // TODO date and day info on each day
  // TODO scroll bar for weeks
  // TODO make color coding based on if the shift is filled for that day
  // Add a line for the current time to the timeline component
    <Box>
      <NavigationBar/>
      <Toolbar></Toolbar>
      <WeekChanger/>
      <Grid container sx={{ mt: '2' }}>
            <Grid item xs={ 11 } sm={ 11 } md={ 11 } lg={ 11 } xl={ 11 }>
              <Box>
                <Week/>
              </Box>
            </Grid>
        </Grid>
    </Box>
  )
}
