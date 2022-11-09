import React, { useState } from 'react'
// import React, { useState, useEffect } from 'react'

import { IconButton, Grid, Stack } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'

export default function WeekChanger (props) {
  function MondayDate (date) {
    const thisDate = new Date()
    thisDate.setDate((date.getDate() - date.getDay()) + 1) // Monday is 1 and Sunday is 0; subtracting the current day of the week from itself and adding 1 will give us Monday's date.
    return thisDate
  }
  function SundayNextDate (date) {
    const thisDate = new Date()
    thisDate.setDate(date.getDate() + (7 - date.getDay())) // Sunday is 0; adding 7 minus the current day of the week will get us this coming Sunday's date.
    return thisDate
  }
  /* For use in the bi-weekly view. Commented out until it is implemented fully.
  function SundaySecondDate (date) {
    const thisDate = new Date()
    thisDate.setDate(date.getDate() + (14 - date.getDay())) // Sunday is 0; adding 14 minus the current day of the week will get us the date of next week's Sunday.
    return thisDate
  }
  */
  function goBackOneWeek (date) {
    const thisDate = date
    console.log('old date: ' + thisDate)
    thisDate.setDate(date.getDate() - 7)
    console.log('new date: ' + thisDate)
    return thisDate
  }
  function goForwardOneWeek (date) {
    const thisDate = date
    console.log('old date: ' + thisDate)
    thisDate.setDate(date.getDate() + 7)
    console.log('new date: ' + thisDate)
    return thisDate
  }
  /* For use in the bi-weekly view. Commented out until it is implemented fully.
  function goBackTwoWeeks (date) {
    date.setDate(date.getDate() - 14)
  }
  function goForwardTwoWeeks (date) {
    date.setDate(date.getDate() + 14)
  }
  */
  const [week, setWeek] = useState(new Date())

  /*
  useEffect(() => {
    // {MondayDate(week).getMonth() + 1}/{MondayDate(week).getDate()} thru {SundayNextDate(week).getMonth() + 1}/{SundayNextDate(week).getDate()}
    const dateRange = document.getElementById('date-range')
    console.log('week is: ' + week)
    dateRange.value = `${MondayDate(week).getMonth()}/${MondayDate(week).getDate()} thru ${SundayNextDate(week).getMonth()}/${SundayNextDate(week).getDate()}`
  })
  */

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
            data-testid="previous-week-button"
            onClick={() => {
              const newWeek = goBackOneWeek(week)
              setWeek(newWeek)
              console.log('ONCLICK: ' + week)
            }}
          >
            <ArrowBack/>
          </IconButton>
          <p
            id="date-range"
            data-testid="date-range-text"
          >
            {MondayDate(week).getMonth() + 1}/{MondayDate(week).getDate()} thru {SundayNextDate(week).getMonth() + 1}/{SundayNextDate(week).getDate()}
          </p>
          <IconButton
            aria-label="next-week"
            data-testid="next-week-button"
            onClick={() => {
              const newWeek = goForwardOneWeek(week)
              setWeek(newWeek)
              console.log('ONCLICK: ' + week)
            }}
            /*
            The problem with onClick is that you're trying to
            pass a function to the useState() function rather
            than a new date. Can you execute a whole function
            here, or do you need to call a new function?
            */
          >
            <ArrowForward/>
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  )
}
