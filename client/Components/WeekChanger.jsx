import React, { useState } from 'react'

import { IconButton, Grid, Stack } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'

export default function WeekChanger (props) {
  function MondayDate (date) {
    const thisDate = new Date()
    // console.log('MONDAY DATE (before): ' + date)
    thisDate.setDate((date.getDate() - date.getDay()) + 1) // Monday is 1 and Sunday is 0; subtracting the current day of the week from itself and adding 1 will give us Monday's date.
    // console.log('MONDAY DATE (after): ' + date)
    return thisDate
  }
  function SundayNextDate (date) {
    const thisDate = new Date()
    // console.log('SUNDAY DATE (before): ' + date)
    thisDate.setDate(date.getDate() + (7 - date.getDay())) // Sunday is 0; adding 7 minus the current day of the week will get us this coming Sunday's date.
    // console.log('SUNDAY DATE (after): ' + date)
    return thisDate
  }
  const [week] = useState(new Date())
  // const [week, setWeek] = useState(new Date())

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
            // onClick={() => setWeek(week.setDate(week.getDate() - 7))}
          >
            <ArrowBack/>
          </IconButton>
          <p>{MondayDate(week).getMonth() + 1}/{MondayDate(week).getDate()} thru {SundayNextDate(week).getMonth() + 1}/{SundayNextDate(week).getDate()}</p>
          <IconButton
            aria-label="next-week"
            // onClick={() => setWeek(week.setDate(week.getDate() + 7))}
          >
           <ArrowForward/>
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  )
}
