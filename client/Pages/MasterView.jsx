import React, { useState } from 'react'

import NavigationBar from '../Components/NavigationBar.jsx'
import Week from '../Components/Week.jsx'
import WeekChanger from '../Components/WeekChanger.jsx'
import ShiftViewToolbarBottom from '../Components/ShiftViewToolbarBottom.jsx'
import ShiftViewToolbarTop from '../Components/ShiftViewToolbarTop.jsx'
import ShiftViewBody from '../Components/ShiftViewBody.jsx'

import { Box, Dialog, Grid } from '@mui/material'

// MasterView Page that will display information for overseeing and editing employee shifts
export default function MasterView (props) {
  const MAX_DAYS = 7
  let clickedDate = new Date()
  const [week, setWeek] = useState(new Date())
  const [shiftViewOpen, setShiftViewOpen] = useState(false)

  // Used by WeekChanger to set new date after button press
  const getNewWeek = (newWeek) => {
    setWeek(newWeek)
    updateWeekdates()
  }
  // Receives the date bubbled up from Day component and opens the Shift View Dialog
  const getClickedDate = (date) => {
    // console.log('Date received: ' + date)
    clickedDate = date
    handleWeekClickOpen()
  }

  // Used to set the initial values for weekdates (below)
  const getInitialWeekdate = (day) => {
    const thisDate = new Date(week)
    thisDate.setDate((week.getDate() - week.getDay()) + 1 + day)
    if (week.getDay() === 0) { // Since Sunday = 0, we need to go back one week if we're making Monday the first day of the week.
      thisDate.setDate(thisDate.getDate() - 7)
    }
    return thisDate
  }

  // Used to pass dates for each day of the week to child components
  // TODO: Refactor to account for MAX_DAYS const
  // ? Can we use a map function to save space?
  const weekdates = [
    getInitialWeekdate(0),
    getInitialWeekdate(1),
    getInitialWeekdate(2),
    getInitialWeekdate(3),
    getInitialWeekdate(4),
    getInitialWeekdate(5),
    getInitialWeekdate(6)
  ]
  // Used to update the days of the week whenever the user changes the week with WeekChanger
  const updateWeekdates = () => {
    for (let i = 0; i < MAX_DAYS; i++) {
      // Monday is 1 and Sunday is 0.
      // Subtracting the current day of the week from itself and adding 1 will give us Monday's date.
      // From there, we can add any number of days to get the desired day of the week.
      weekdates[i].setDate(((week.getDate() - week.getDay()) + 1) + i)
      if (week.getDay() === 0) { // Since Sunday = 0, we need to go back one week if we're making Monday the first day of the week.
        weekdates[i].setDate(weekdates[i].getDate() - 7)
      }
    }
  }

  // These are used to handle opening and closing of the Shift View Dialog.
  const handleWeekClickOpen = () => {
    setShiftViewOpen(true)
  }

  // Receives a command from Shift View's top toolbar to close the Shift View Dialog
  const handleShiftViewClose = () => {
    setShiftViewOpen(false)
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
          <Week weekdates={weekdates} passClickedDate={getClickedDate} data-testid='week'/>
        </Grid>
      </Grid>
      <Dialog
        data-testid="shift-view-dialog"
        fullScreen
        open={shiftViewOpen}
        onClose={handleShiftViewClose}
        // TransitionComponent={Transition}
      >
        <Box sx={{
          flexDirection: 'column'
        }}>
          <Grid container direction="column" justifyContent="space-between">
            <Grid item xs={ 2 }>
              <ShiftViewToolbarTop passCloseCommand={handleShiftViewClose} selectedDate={clickedDate}/>
            </Grid>
            <Grid item xs>
              <ShiftViewBody date='DATE WILL GO HERE'/>
            </Grid>
            <Grid item xs={ 2 }>
              <ShiftViewToolbarBottom />
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Box>
  )
}
