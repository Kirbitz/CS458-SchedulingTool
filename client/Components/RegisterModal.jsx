import React, { useState, useRef } from 'react'

import { Button, Dialog, Grid, TextField, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import PropTypes from 'prop-types'

import SaveAndNotify from './SaveAndNotify.jsx'
import { createNewUserAccount } from '../dataHelper.js'

export default function Register (props) {
  // Destructure open and handleClose from input props
  const { open, handleClose } = props

  // Validates input for username field
  const usernameRef = useRef('')
  const [usernameValid, setUsernameValid] = useState(false)

  // Validates input for password field
  const passwordRef = useRef('')
  const [passwordValid, setPasswordValid] = useState(false)

  // Validates input for repeat password field
  const repeatPasswordRef = useRef('')
  const [repeatPasswordValid, setRepeatPasswordValid] = useState(false)

  // Validates input for user id field
  const userIdRef = useRef('')
  const [userIdValid, setUserIdValid] = useState(false)

  // Validates input for name field
  const nameRef = useRef('')
  const [nameValid, setNameValid] = useState(false)

  // Validates input for max hours field
  const hoursRef = useRef('')
  const [hoursValid, setHoursValid] = useState(false)

  // Checks all fields have a value in them
  const [lengthCheck, setLengthCheck] = useState(true)

  const [success, setSuccess] = useState(false)

  const closeModal = () => {
    if (handleClose) {
      handleClose()
    }
  }

  // It will validate all input value.
  const validateInput = async (textField) => {
    // Destructure name from the textfield that triggered this function
    const { name } = textField.target
    switch (name) {
      case 'userId':
        await setUserIdValid(!(userIdRef.current.value.length > 0 && userIdRef.current.value.match('^[0-9]+$')))
        break
      case 'name':
        setNameValid(!(nameRef.current.value.length > 0 && nameRef.current.value.match('^[a-zA-Z]+( [a-zA-Z]+)*$')))
        break
      case 'username':
        setUsernameValid(!(usernameRef.current.value.length > 0 && usernameRef.current.value.match('^[a-zA-Z0-9]+$')))
        break
      case 'maxHours':
        setHoursValid(!(hoursRef.current.value.length > 0 && hoursRef.current.value.match('^[0-9]+$')))
        break
      default:
        setPasswordValid(!(passwordRef.current.value.length > 0 && passwordRef.current.value.match('^[a-zA-Z0-9 ~!@#$^*_+?.,]+$')))
        setRepeatPasswordValid(repeatPasswordRef.current.value !== passwordRef.current.value)
        break
    }

    setLengthCheck(
      userIdRef.current.value.length <= 0 ||
      nameRef.current.value.length <= 0 ||
      usernameRef.current.value.length <= 0 ||
      hoursRef.current.value.length <= 0 ||
      passwordRef.current.value.length <= 0 ||
      repeatPasswordRef.current.value.length <= 0
    )
  }

  const handleSubmit = () => {
    createNewUserAccount({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      newUserId: userIdRef.current.value,
      name: nameRef.current.value,
      hourCap: hoursRef.current.value
    })
      .then(() => {
        setSuccess(true)
        handleClose()
      })
      .catch((error) => {
        console.error(error)
        setSuccess(false)
      })
  }

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      data-testid="register-modal-root"
    >
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="userId"
              label="User Id"
              inputRef={userIdRef}
              onChange={validateInput}
              error={userIdValid}
              data-testid="userId-input"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              inputRef={nameRef}
              onChange={validateInput}
              error={nameValid}
              data-testid="name-input"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              inputRef={usernameRef}
              onChange={validateInput}
              error={usernameValid}
              data-testid="userName-input"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="maxHours"
              label="Max Hours"
              inputRef={hoursRef}
              onChange={validateInput}
              error={hoursValid}
              data-testid="maxHours-input"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              inputRef={passwordRef}
              onChange={validateInput}
              error={passwordValid}
              data-testid="password-input"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="repeat_password"
              label="Repeat Password"
              type="password"
              inputRef={repeatPasswordRef}
              onChange={validateInput}
              error={repeatPasswordValid}
              data-testid="repeat_password-input"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeModal}
          variant="contained"
          color="secondary"
          data-testid="close-register-modal"
        >
          Close
        </Button>
        <SaveAndNotify disabled={
          userIdValid ||
          nameValid ||
          usernameValid ||
          hoursValid ||
          passwordValid ||
          repeatPasswordValid ||
          lengthCheck
        } callbackFunc={handleSubmit} success={success} />
      </DialogActions>
    </Dialog>
  )
}

// Validates the props being accepted into this element
Register.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
}

// Sets the default value of the props if none are provided
Register.defaultProps = {
  open: false,
  handleClose: null
}
