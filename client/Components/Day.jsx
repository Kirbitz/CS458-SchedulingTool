import React from 'react'
import PropTypes from 'prop-types'

import { Button, Card, Typography, CardContent } from '@mui/material'

// Week component for the master schedule view
export default function Day (props) {
  const { weekday } = props
  // const dd = this.props

  // Colors
  // Green #1fd655, Red #FFCCCB, Grey #B4B5B4
  const buttonTextColor = '#111C2C'
  const buttonColor = '#FFCCCB'
  const btnWidth = '100%'
  const btnHeight = '100%'

  return (<div>
        <h3>{ weekday }</h3>
        <Card spacing={0} sx={{ width: 250, height: 1170, margin: 0 }}>
          <Button sx={{
            color: buttonTextColor,
            width: btnWidth,
            height: btnHeight,
            backgroundColor: buttonColor
          }}>
          <CardContent>
            <Typography></Typography>
          </CardContent>
          </Button>
        </Card>
  </div>
  )
}

// Checks that the props passed in match the correct type
Day.propTypes = {
  weekday: PropTypes.string
}

// defaults the props to a set value if they are not required
Day.defaultProps = {
  weekday: ''
}
