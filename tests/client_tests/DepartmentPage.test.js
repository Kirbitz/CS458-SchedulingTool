import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import DepartmentPage from '../../client/Pages/DepartmentPage.jsx'
import { BrowserRouter } from 'react-router-dom'
import { act } from 'react-test-renderer'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('Tests for <DepartmentPage />', () => {
  window.alert = jest.fn()
  let mock
  const depInfo = {
    deptId: '123',
    depName: 'Yahoo',
    depEmployees: [
      { userId: '5555555', userName: 'Ben Dover' },
      { userId: '5772342', userName: 'Chris Angle' }
    ]
  }

  beforeEach(() => {
    mock = new MockAdapter(axios)
    jest.spyOn(console, 'error').mockImplementation(() => {})
    window.alert.mockClear()
  })

  afterEach(() => {
    mock.reset()
    mock.restore()
    mock.resetHandlers()
  })

  it('Initial Render', async () => {
    mock.onGet().reply(200, depInfo)
    await act(async () => { render(<DepartmentPage />, { wrapper: BrowserRouter }) })

    expect(screen.getByTestId('department-page').innerHTML).toContain('Department:')
    expect(mock.history.get.length).toBe(1)
  })

  it('Data Loading', async () => {
    mock.onGet().reply(function (config) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve([200, null])
        }, 2000)
      })
    })
    await act(async () => { render(<DepartmentPage />, { wrapper: BrowserRouter }) })

    expect(screen.getByTestId('department-page').outerHTML).toContain('Progress')
    expect(mock.history.get.length).toBe(1)
  })

  it('Failed to collect data', async () => {
    mock.onGet().networkError()
    await act(async () => { render(<DepartmentPage />, { wrapper: BrowserRouter }) })

    expect(screen.getByTestId('department-page').innerHTML).toContain('No Data Found')
    expect(mock.history.get.length).toBe(1)
  })

  it('Search for employee data successful input success data fetch', async () => {
    const input = 'sup'
    mock.onGet().reply(200, depInfo)

    await act(async () => { render(<DepartmentPage />, { wrapper: BrowserRouter }) })
    await fireEvent.change(screen.getByLabelText('Employee Id/Name'), { target: { value: input } })
    await fireEvent.click(screen.getByTestId('search-btn'))

    expect(screen.getByLabelText('Employee Id/Name').outerHTML).toContain(input)
    expect(mock.history.get.length).toBe(2)
  })

  it('Search for employee data successful input failed data fetch', async () => {
    const input = 'sup'
    mock.onGet().replyOnce(200, depInfo).onGet().networkError()

    await act(async () => { render(<DepartmentPage />, { wrapper: BrowserRouter }) })
    await fireEvent.change(screen.getByLabelText('Employee Id/Name'), { target: { value: input } })
    await fireEvent.click(screen.getByTestId('search-btn'))

    await waitFor(() => {
      expect(screen.getByTestId('create-btn').outerHTML).not.toContain('disabled')
    })
    expect(screen.getByLabelText('Employee Id/Name').outerHTML).toContain(input)
    expect(mock.history.get.length).toBe(2)
  })

  it.each`
  input
  ${'?><M'}
  ${'asdf1234'}
  ${' abc'}
  ${'abc '}
  ${' 123'}
  `('Search for employee data invalid inputs', async ({ input }) => {
    mock.onGet().reply(200, depInfo)

    await act(async () => { render(<DepartmentPage />, { wrapper: BrowserRouter }) })

    await fireEvent.change(screen.getByLabelText('Employee Id/Name'), { target: { value: input } })
    expect(screen.getByLabelText('Employee Id/Name').outerHTML).toContain('aria-invalid="true"')

    expect(mock.history.get.length).toBe(1)
  })

  it('Updating the list of employees success', async () => {
    mock.onGet().reply(200, depInfo).onPost().reply(200).onDelete().reply(200)

    await act(async () => { render(<DepartmentPage />, { wrapper: BrowserRouter }) })

    await fireEvent.click(screen.getByTestId('remove-btn'))
    await fireEvent.click(screen.getByTestId('add-btn'))
    await fireEvent.click(screen.getByTestId('save-btn'))

    expect(mock.history.post.length).toBe(1)
    expect(mock.history.delete.length).toBe(1)
  })

  it('Updating the list of employees fail', async () => {
    mock.onGet().reply(200, depInfo).onPost().networkError()

    await act(async () => { render(<DepartmentPage />, { wrapper: BrowserRouter }) })

    await fireEvent.click(screen.getByTestId('remove-btn'))
    await fireEvent.click(screen.getByTestId('add-btn'))
    await fireEvent.click(screen.getByTestId('save-btn'))

    expect(mock.history.post.length).toBe(1)
  })
})
