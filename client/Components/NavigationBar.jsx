import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { AppBar, Box, Container, IconButton, Toolbar, Tooltip } from '@mui/material'
import { Business, CalendarMonth, Dashboard, Person, Portrait, Settings } from '@mui/icons-material'

// Navigation bar component that can exist at the top of each page
export default function NavigationBar (props) {
  // indicator for the selected page of the navbar
  const { selected } = props

  // colors to indicate which tab is selected in the navbar
  const selectedColor = 'warning'
  const nonSelectedColor = 'primary'

  return (
    <AppBar data-testid="navigation-bar">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <img
            src='\images\UWStoutLogo.png'
            alt='Stout Logo'
            height='30px'
            width='30px'
          />
          <Tooltip title="Dashboard" data-testid="Dashboard">
              <IconButton component={Link} to="/dashboard" size="large" color={selected === 'Dashboard' ? selectedColor : nonSelectedColor} sx={{ mx: 1 }}>
                <Dashboard />
              </IconButton>
          </Tooltip>
          <Tooltip title="Master Schedule" data-testid="Master">
            <IconButton component={Link} to="/master-schedule" size="large" color={selected === 'Master' ? selectedColor : nonSelectedColor } sx={{ mx: 1 }}>
              <CalendarMonth />
            </IconButton>
          </Tooltip>
          <Tooltip title="Employee Schedule" data-testid="Employee">
            <IconButton component={Link} to="/employee-schedule" size="large" color={selected === 'Employee' ? selectedColor : nonSelectedColor } sx={{ mx: 1 }}>
              <Portrait />
            </IconButton>
          </Tooltip>
          <Tooltip title="Staff" data-testid="Staff">
            <IconButton component={Link} to="/staff" size="large" color={selected === 'Staff' ? selectedColor : nonSelectedColor} sx={{ mx: 1 }}>
              <Person />
            </IconButton>
          </Tooltip>
          <Tooltip title="Department" data-testid="Department">
            <IconButton component={Link} to="/department" size="large" color={selected === 'Department' ? selectedColor : nonSelectedColor} sx={{ mx: 1 }}>
              <Business />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Settings" data-testid="Settings">
            <IconButton component={Link} to="/settings" size="large" color={selected === 'Settings' ? selectedColor : nonSelectedColor } sx={{ mx: 1 }}>
              <Settings />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

// Checks that the props passed in match the correct type
NavigationBar.propTypes = {
  selected: PropTypes.string
}

// defaults the props to a set value if they are not required
NavigationBar.defaultProps = {
  selected: ''
}
