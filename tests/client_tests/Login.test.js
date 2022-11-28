import React from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fireEvent, render, screen } from '@testing-library/react'
import LogIn from '../../client/Pages/LogIn.jsx'
import { act } from 'react-test-renderer'

describe('Tests for <LogIn />', () => {
  let mock
  const returnData = {
    userId: 5,
    isManager: true
  }
  afterEach(() => {
    mock.reset()
    mock.restore()
    mock.resetHandlers()
  })
  beforeEach(() => {
    mock = new MockAdapter(axios)
    delete window.location
    window.location = new URL('https://hello.com')
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('Initial Render', () => {
    const component = render(<LogIn />)
    expect(component.baseElement.outerHTML).toContain('Remember me')
  })

  it('Successful Login', async () => {
    mock.onPost('/api/login').reply(200, returnData)
    await act(async () => { render(<LogIn />) })
    await fireEvent.change(screen.getByTestId('UserNameInput').getElementsByClassName('MuiInputBase-input')[0], { target: { value: 'test' } })
    await fireEvent.change(screen.getByTestId('Password-input').getElementsByClassName('MuiInputBase-input')[0], { target: { value: 'test' } })
    await fireEvent.click(screen.getByTestId('logIn-button'))

    expect(mock.history.post.length).toBe(1)
  })

  it('Successfully Displays Error', async () => {
    
  })
})
