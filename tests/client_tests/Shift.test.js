// Shift renders
import Shift from '../../client/Components/Shift.jsx'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

describe('Tests for <Shift />', () => {
  it('init render', async () => {
    const component = render(<Shift />, { wrapper: BrowserRouter })

    expect(document.body).toBe(component.baseElement)
  })

  it('Display Menu when Assignment Button Clicked', async () => {
    const component = render(<Shift />, { wrapper: BrowserRouter })
    await fireEvent.click(component.getByTestId('employee-Assignment-Button'))

    await waitFor(() => {
      expect(screen.getByTestId('shift-menu')).not.toBeNull()
    })
  })

  it('Employee Assigned To Shift', async () => {
    const component = render(<Shift />, { wrapper: BrowserRouter })
    await fireEvent.click(component.getByTestId('employee-Assignment-Button'))

    await waitFor(async () => {
      await fireEvent.click(component.getByTestId('shift-menu-1'))
    })

    expect(screen.getByTestId('assigned-person').outerHTML).toContain('Abraham Abrahamsen')
  })

  it('Employee Unassigned To Shift', async () => {
    const component = render(<Shift />, { wrapper: BrowserRouter })
    await fireEvent.click(component.getByTestId('employee-Assignment-Button'))

    await waitFor(async () => {
      await fireEvent.click(component.getByTestId('shift-menu-1'))
    })

    await fireEvent.click(component.getByTestId('employee-Unassignment-Button'))

    expect(screen.getByTestId('assigned-person').outerHTML).toContain('[unassigned]')
  })
})
