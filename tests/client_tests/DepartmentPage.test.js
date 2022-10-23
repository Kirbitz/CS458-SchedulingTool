import React from 'react'
import { render, screen } from '@testing-library/react'

import DepartmentPage from '../../client/Pages/DepartmentPage.jsx'
import { BrowserRouter } from 'react-router-dom'
import { act } from 'react-test-renderer'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('Tests for <DepartmentPage />', () => {
  window.alert = jest.fn()
  let mock
  const depInfo = {
    depName: 'Yahoo',
    depEmployees: [
      { id: '5555555', name: 'Ben Dover' },
      { id: '5772342', name: 'Chris Angle' }
    ]
  }

  beforeAll(() => {
    mock = new MockAdapter(axios)
    jest.spyOn(console, 'error').mockImplementation(() => {})
    window.alert.mockClear()
  })

  afterEach(() => {
    mock.reset()
  })

  it('Initial Render', async () => {
    mock.onGet('/myfakeroute').reply(200, depInfo)
    await act(async () => { render(<DepartmentPage />, { wrapper: BrowserRouter }) })

    expect(screen.getByTestId('department-page').innerHTML).toContain('Department:')
  })

  it('Failed to collect data', async () => {
    mock.onGet('/myfakeroute').networkError()
    await act(async () => { render(<DepartmentPage />, { wrapper: BrowserRouter }) })

    expect(screen.getByTestId('department-page').innerHTML).toContain('No Data Found')
  })

  // it('Loading wheel is present', async () => {
  //   mock.onGet('/myfakeroute').reply(200, null)
  //   await act(async () => { render(<DepartmentPage />, { wrapper: BrowserRouter }) })

  //   expect(screen.getByTestId('department-page').innerHTML).toContain('No Data Found')
  // })
})
