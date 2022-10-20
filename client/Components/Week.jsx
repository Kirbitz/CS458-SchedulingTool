import React from 'react'

import Day from './Day.jsx'
import { Grid } from '@mui/material'

// const dateData = [{ weekday: 'Monday', date: 23 }]
// Week component for the master schedule view
export default function Week (props) {
  return (

          <Grid container spacing={0.5}>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                <Day weekday={ 'Monday' }/>
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                <Day weekday={ 'Tuesday' }/>
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                <Day weekday={ 'Wednesday' }/>
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                <Day weekday={ 'Thursday' }/>
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                <Day weekday={ 'Friday' }/>
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                <Day weekday={ 'Saturday' }/>
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                <Day weekday={ 'Sunday' }/>
              </Grid>

          </Grid>

  )
}
