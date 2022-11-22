import React from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fireEvent, render, screen } from '@testing-library/react'
import LogIn from '../../client/Pages/LogIn.jsx'

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
  })

  it('Initial Render', () => {
    const component = render(<LogIn />)
    expect(component.baseElement.outerHTML).toContain('Remember me')
  })

  it('Successful Login', async () => {
    mock.onPost('/api/login').reply(200, returnData)
    const component = render(<LogIn />)
    await fireEvent.change(screen.getByLabelText('UserName'), { target: { value: 'test' } })
    await fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'test' } })
    await fireEvent.click(component.getByTestId('logIn-button'))

    expect(mock.history.post.length).toBe(1)
  })
})
