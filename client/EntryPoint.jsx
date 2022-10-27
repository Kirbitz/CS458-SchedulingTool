import { Container, CssBaseline } from '@mui/material'
import Login from './Components/Log.jsx'
const React = require('react')

export default function EntryPoint (props) {
  return (
    <Container data-testid="MuiContainer">
      <CssBaseline />
      <Login />
    </Container>
  )
}
