import React, { useState } from 'react'

import NavigationBar from '../Components/NavigationBar.jsx'
import Week from '../Components/Week.jsx'
import WeekChanger from '../Components/WeekChanger.jsx'

import { Box, Grid } from '@mui/material'

// MasterView Page that will display information for overseeing and editing employee shifts
export default function MasterView (props) {
  const [week, setWeek] = useState(new Date())

  // Used by WeekChanger to set new date after button press
  const getNewWeek = (newWeek) => {
    setWeek(newWeek)
  }

  // Used to determine range of dates to pass to Day buttons
  function MondayDate (date) {
    const thisDate = new Date(date)
    thisDate.setDate((date.getDate() - date.getDay()) + 1) // Monday is 1 and Sunday is 0; subtracting the current day of the week from itself and adding 1 will give us Monday's date.
    return thisDate
  }

  return (
  // TODO Month label
  // TODO date and day info on each day
  // TODO scroll bar for weeks
  // TODO make color coding based on if the shift is filled for that day
  // Add a line for the current time to the timeline component
    <Box>
      <NavigationBar selected="Master" />
      <WeekChanger date={week} passNewDate={getNewWeek} style={{ height: '100vh' }}/>
      <Grid container sx={{ mt: '2' }}>
        <Grid item xs={ 11 }>
          <Week data-testid='week'/>
        </Grid>
      </Grid>
    </Box>
  )
}
