import React from 'react'

import { Container, CssBaseline } from '@mui/material'

import { BrowserRouter } from 'react-router-dom'

import PageRoutes from './Components/PageRoutes.jsx'

// The entry point of the entire react app
// Exists to give a location for managing state effectively without overfilling app.jsx
export default function EntryPoint (props) {
  return (
    <BrowserRouter>
      <Container data-testid="MuiContainer">
        <CssBaseline />
        <PageRoutes />
      </Container>
    </BrowserRouter>
  )
}
