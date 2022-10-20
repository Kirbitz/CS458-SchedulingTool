import React from 'react'

import Day from './Day.jsx'
import Timeline from './Timeline.jsx'
import { Grid } from '@mui/material'

// const dateData = [{ weekday: 'Monday', date: 23 }]

// Week component for the master schedule view
export default function Week (props) {
  // sizing for Grid items
  const oneSixth = 2
  const weekGridBoxSize = 10

  return (
          <Grid sx={{ flexGrow: 1 }} container spacing={1}>
              <Grid item xs={ oneSixth } sm={ oneSixth } md={ oneSixth } lg={ oneSixth } xl={ oneSixth }>
                <Timeline/>
              </Grid>
              <Grid item xs={weekGridBoxSize} sm={weekGridBoxSize} md={weekGridBoxSize} lg={weekGridBoxSize} xl={weekGridBoxSize}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Day sx={{ height: '300' }} weekday={ 'Monday' }/>
                  <Day sx={{ height: '300' }} weekday={ 'Tuesday' }/>
                  <Day sx={{ height: '300' }} weekday={ 'Wednesday' }/>
                  <Day sx={{ height: '300' }} weekday={ 'Thursday' }/>
                  <Day sx={{ height: '300' }} weekday={ 'Friday' }/>
                  <Day sx={{ height: '300' }} weekday={ 'Saturday' }/>
                  <Day sx={{ height: '300' }} weekday={ 'Sunday' }/>
                </div>
              </Grid>
          </Grid>
  )
}
