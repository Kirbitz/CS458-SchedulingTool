import React from 'react'
import PropTypes from 'prop-types'

import { Button, Card, Typography, CardContent } from '@mui/material'

// Week component for the master schedule view
export default function Day (props) {
  const { weekday } = props
  // const dd = this.props

  // Colors
  const buttonTextColor = '#111C2C'
  const buttonColor = '#B4B5B4'
  const btnWidth = '50%'

  return (<div>
        <Card spacing={3} sx={{ minWidth: 100, maxWidth: 400, width: '95%', height: 300 }}>
          <CardContent>
            <Typography color={ buttonTextColor }>{weekday}</Typography>
            {/* Button for adding commitments */}
            <Button sx={{
              mx: 'auto',
              color: buttonTextColor,
              width: btnWidth,
              height: '100%',
              backgroundColor: buttonColor
            }}>
            </Button>
            {/* Button for subtracting commitments */}
            <Button sx={{
              mx: 'auto',
              color: buttonTextColor,
              width: btnWidth,
              height: '100%',
              backgroundColor: buttonColor
            }}> for subbing
            </Button>
          </CardContent>
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
