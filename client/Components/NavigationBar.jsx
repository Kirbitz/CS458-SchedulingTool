import React from 'react'

import { AppBar, Box, Container, IconButton, Toolbar, Tooltip } from '@mui/material'
import { CalendarMonth, Dashboard, Person, Portrait, Settings } from '@mui/icons-material'

export default function NavigationBar (props) {
  return (
    <AppBar data-testid="navigation-bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src='\images\UWStoutLogo.png'
            alt='Stout Logo'
            height='30px'
            width='30px'
          />
          <Tooltip title="Dashboard">
            <IconButton size="large" sx={{ mx: 1 }}>
              <Dashboard />
            </IconButton>
          </Tooltip>
          <Tooltip title="Master Schedule">
            <IconButton size="large" sx={{ mx: 1 }}>
              <CalendarMonth />
            </IconButton>
          </Tooltip>
          <Tooltip title="Employee Schedule">
            <IconButton size="large" sx={{ mx: 1 }}>
              <Portrait />
            </IconButton>
          </Tooltip>
          <Tooltip title="Staff">
            <IconButton size="large" sx={{ mx: 1 }}>
              <Person />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Settings">
            <IconButton size="large" sx={{ mx: 1 }}>
              <Settings />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
