import React from 'react'

import Day from './Day.jsx'
import Timeline from './Timeline.jsx'

// const dayInfo = { weekday: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], dayElementHeight: '85vh' }
const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
// Week component for the master schedule view
export default function Week (props) {
  return (
    // remember we need to have everything in a parent root tag including javascript
    <React.Fragment>
    <div style={{ position: 'absolute', left: '10px', display: 'flex', flexDirection: 'row' }}>

      {/* {dishes.map(dish => (
        // eslint-disable-next-line react/jsx-key
        <li>{dish}</li>
        THIS BLOCK IS LEARNING, WE CAN MAP DISHES FROM GLOBAL OBJECT TO THE LI TAG
      ))} */}

      <Timeline/>
      <Day weekday={ day[0] }/>
      <Day weekday={ day[1] }/>
      <Day weekday={ day[2] }/>
      <Day weekday={ day[3] }/>
      <Day weekday={ day[4] }/>
      <Day weekday={ day[5] }/>
      <Day weekday={ day[6] }/>
    </div>
    </React.Fragment>
  )
}
