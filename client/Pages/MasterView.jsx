import React from 'react'

import NavigationBar from '../Components/NavigationBar.jsx'
import Week from '../Components/Week.jsx'
import WeekChanger from '../Components/WeekChanger.jsx'

import { Box, Grid, Toolbar } from '@mui/material'

// Week component for the master schedule view
export default function MasterView (props) {
  return (
    <Box>
      <NavigationBar selected="Master" />
      <Toolbar></Toolbar>
      <WeekChanger style={{ height: '100vh' }}/>
      <Grid container sx={{ mt: '2' }}>
            <Grid item xs={ 11 } sm={ 11 } md={ 11 } lg={ 11 } xl={ 11 }>
                <Week data-testid='week'/>
            </Grid>
        </Grid>
    </Box>
  )
}
