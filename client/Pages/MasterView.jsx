import React from 'react'

import NavigationBar from '../Components/NavigationBar.jsx'
import Week from '../Components/Week.jsx'
import WeekChanger from '../Components/WeekChanger.jsx'

import { Box, Grid } from '@mui/material'

// MasterView Page that will display information for overseeing and editing employee shifts
export default function MasterView (props) {
  return (
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
