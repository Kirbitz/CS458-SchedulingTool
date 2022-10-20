import React from 'react'

import NavigationBar from '../Components/NavigationBar.jsx'
import Week from '../Components/Week.jsx'
import { Grid, Box, Toolbar } from '@mui/material'

// import { PersonRoundedIcon } from '@mui/icons-material/PersonRounded'

// const dateData = [{ weekday: 'Monday', date: 23 }]
// Week component for the master schedule view

export default function MasterView (props) {
  return (
  // TODO Month label
  // TODO date and day info on each day
  // TODO scroll bar for weeks
  // List of names for employees
  // make Day a card - done
  // Add a line for the current time
    <Box>
      <NavigationBar/>
      <Toolbar></Toolbar>
      <Grid container sx={{ mt: '200' }}>
            <Grid item xs={ 11 } sm={ 11 } md={ 11 } lg={ 11 }>
              <Box>
                <Week/>
              </Box>
            </Grid>
        </Grid>
      </Box>
  )
}
