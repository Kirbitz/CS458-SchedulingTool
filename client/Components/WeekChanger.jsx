import React, { useState } from 'react'

import { IconButton, Grid, Stack } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'

// Component to display and change the currently selected week
export default function WeekChanger (props) {
  const [week, setWeek] = useState(new Date())

  const [, updateState] = React.useState()
  const forceRender = React.useCallback(() => updateState({}), [])

  function MondayDate (date) {
    const thisDate = new Date(date)
    thisDate.setDate((date.getDate() - date.getDay()) + 1) // Monday is 1 and Sunday is 0; subtracting the current day of the week from itself and adding 1 will give us Monday's date.
    return thisDate
  }

  function SundayNextDate (date) {
    const thisDate = new Date(date)
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
  // Moves the current week backward by one week
  const goBackOneWeek = (date) => {
    const thisDate = new Date(week)
    thisDate.setDate(thisDate.getDate() - 7)
    setWeek(thisDate)
    forceRender()
  }
  // Moves the current week forward by one week
  const goForwardOneWeek = (date) => {
    const thisDate = new Date(week)
    thisDate.setDate(thisDate.getDate() + 7)
    setWeek(thisDate)
    forceRender()
  }
  /* For use in the bi-weekly view. Commented out until it is implemented fully.
  function goBackTwoWeeks (date) {
    date.setDate(date.getDate() - 14)
  }
  function goForwardTwoWeeks (date) {
    date.setDate(date.getDate() + 14)
  }
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
            onClick={goBackOneWeek}
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
            onClick={goForwardOneWeek}
          >
            <ArrowForward/>
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  )
}
