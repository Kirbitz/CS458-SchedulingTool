import React from 'react'
import PropTypes from 'prop-types'

import { Button, Card, Typography, CardContent } from '@mui/material'

// Week component for the master schedule view
export default function Day (props) {
  const { weekday } = props
  // const dd = this.props

  return (<div>
        <Card sx={{ minWidth: 100, maxWidth: 400, width: 200, height: 300 }}>
          <CardContent>
            <Typography>{weekday}</Typography>
            <Button sx={{
              mx: 'auto',
              color: '#111C2C',
              width: 'fullWidth',
              backgroundColor: '#B4B5B4'
            }}></Button>
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
