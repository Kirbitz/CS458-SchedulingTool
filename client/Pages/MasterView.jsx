import React from 'react'

import NavigationBar from '../Components/NavigationBar.jsx'
import Week from '../Components/Week.jsx'
import WeekChanger from '../Components/WeekChanger.jsx'

import { Box, Grid } from '@mui/material'

// MasterView Page that will display information for overseeing and editing employee shifts
export default function MasterView (props) {
  return (
  // TODO Month label
  // TODO date and day info on each day
  // TODO scroll bar for weeks
  // TODO make color coding based on if the shift is filled for that day
  // Add a line for the current time to the timeline component
    <Box>
      <NavigationBar selected="Master" />
      <WeekChanger style={{ height: '100vh' }}/>
      <Grid container sx={{ mt: '2' }}>
        <Grid item xs={ 11 }>
          <Week data-testid='week'/>
        </Grid>
      </Grid>
    </Box>
  )
}
