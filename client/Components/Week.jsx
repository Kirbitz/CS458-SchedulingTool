import React from 'react'

import Day from './Day.jsx'
import { Grid } from '@mui/material'

// const dateData = [{ weekday: 'Monday', date: 23 }]

// Week component for the master schedule view
export default function Week (props) {
  // sizing for Grid items
  const all = 12
  const half = 6
  const oneThird = 4
  const oneFourth = 3
  const oneSixth = 2

  return (

          <Grid sx={{ flexGrow: 1 }} container spacing={1}>
              <Grid item xs={ all } sm={ half } md={ oneThird } lg={ oneFourth } xl={ oneSixth }>
                <Day weekday={ 'Monday' }/>
              </Grid>
              <Grid item xs={ all } sm={ half } md={ oneThird } lg={ oneFourth } xl={ oneSixth }>
                <Day weekday={ 'Tuesday' }/>
              </Grid>
              <Grid item xs={ all } sm={ half } md={ oneThird } lg={ oneFourth } xl={ oneSixth }>
                <Day weekday={ 'Wednesday' }/>
              </Grid>
              <Grid item xs={ all } sm={ half } md={ oneThird } lg={ oneFourth } xl={ oneSixth }>
                <Day weekday={ 'Thursday' }/>
              </Grid>
              <Grid item xs={ all } sm={ half } md={ oneThird } lg={ oneFourth } xl={ oneSixth }>
                <Day weekday={ 'Friday' }/>
              </Grid>
              <Grid item xs={ all } sm={ half } md={ oneThird } lg={ oneFourth } xl={ oneSixth }>
                <Day weekday={ 'Saturday' }/>
              </Grid>
              <Grid item xs={ all } sm={ half } md={ oneThird } lg={ oneFourth } xl={ oneSixth }>
                <Day weekday={ 'Sunday' }/>
              </Grid>

          </Grid>

  )
}
