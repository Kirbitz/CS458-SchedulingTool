import React from 'react'

import { Container, CssBaseline } from '@mui/material'

import NavigationBar from './Components/NavigationBar.jsx'

export default function EntryPoint (props) {
  return (
    <Container data-testid="MuiContainer">
      <CssBaseline />
      <NavigationBar />
    </Container>
  )
}
