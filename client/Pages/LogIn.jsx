import * as React from 'react'
import {
  Button, TextField, FormControlLabel, Checkbox,
  Link, Grid, Box, Typography, Container, Snackbar, Alert
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { userLogin } from '../dataHelper.js'

export default function Log () {
  const [showAlert, setShowAlert] = React.useState(false)
  const navigate = useNavigate()

  const displayError = () => {
    setShowAlert(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (data.get('userName').match('^[a-zA-Z0-9]+$') && data.get('password').match('^[a-zA-Z0-9 ~!@#$^*_+?.,]+$')) {
      await userLogin({ username: data.get('userName'), password: data.get('password') })
        .then(() => { navigate('/dashboard') })
        .catch((error) => {
          console.error(error)
          displayError()
        })
    } else {
      displayError()
    }
  }
  const handleClose = () => {
    setShowAlert(false)
  }

  return (

  // <div style= {{padding:30}}>
        <Container maxWidth = "xs">
          <Box
            sx = {{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="UserName"
                name="userName"
                autoComplete="UserName"
                autoFocus
                data-testid = "UserNameInput"
                error = {showAlert}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                data-testid = "Password-input"
                error = {showAlert}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                data-testid = "logIn-button"
              >
                Log In
              </Button>
              <Grid>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Snackbar
            open={showAlert}
            onClose={handleClose}
            autoHideDuration={15000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
            severity="error"
            onClose={handleClose}
            data-testid="Invalid-Credentials"
            >
              Invalid Credentials
            </Alert>
          </Snackbar>
        </Container>

  )
}
