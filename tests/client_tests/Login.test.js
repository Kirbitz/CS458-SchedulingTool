import React from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import LogIn from '../../client/Pages/LogIn.jsx'
import { act } from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

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
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('Initial Render', () => {
    const component = render(<LogIn />, { wrapper: BrowserRouter })
    expect(component.baseElement.outerHTML).toContain('Remember me')
  })

  it('Successful Login', async () => {
    mock.onPost('/api/login').reply(200, returnData)
    await act(async () => { render(<LogIn />, { wrapper: BrowserRouter }) })
    await fireEvent.change(screen.getByTestId('UserNameInput').getElementsByClassName('MuiInputBase-input')[0], { target: { value: 'test' } })
    await fireEvent.change(screen.getByTestId('Password-input').getElementsByClassName('MuiInputBase-input')[0], { target: { value: 'test' } })
    await act(async () => { fireEvent.click(screen.getByTestId('logIn-button')) })

    expect(mock.history.post.length).toBe(1)
  })

  it('UserName/Password Not found', async () => {
    mock.onPost('/api/login').networkError()
    await act(async () => { render(<LogIn />, { wrapper: BrowserRouter }) })
    await fireEvent.change(screen.getByTestId('UserNameInput').getElementsByClassName('MuiInputBase-input')[0], { target: { value: 'test' } })
    await fireEvent.change(screen.getByTestId('Password-input').getElementsByClassName('MuiInputBase-input')[0], { target: { value: 'test' } })
    await act(async () => { fireEvent.click(screen.getByTestId('logIn-button')) })

    expect(mock.history.post.length).toBe(1)
  })

  it('Invalid Username/Password', async () => {
    mock.onPost('/api/login').networkError()
    await act(async () => { render(<LogIn />, { wrapper: BrowserRouter }) })
    await fireEvent.change(screen.getByTestId('UserNameInput').getElementsByClassName('MuiInputBase-input')[0], { target: { value: 'test+' } })
    await fireEvent.change(screen.getByTestId('Password-input').getElementsByClassName('MuiInputBase-input')[0], { target: { value: 'test' } })
    await act(async () => { fireEvent.click(screen.getByTestId('logIn-button')) })

    expect(screen.queryByTestId('Invalid-Credentials')).not.toBeNull()
    await fireEvent.click(screen.getByTitle('Close'))
    await waitFor(() => {
      expect(screen.queryByTestId('Invalid-Credentials')).toBeNull()
    })
  })
})
