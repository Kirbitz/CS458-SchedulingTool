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
    const employees = [
      'Abraham Abrahamsen',
      'Bob Robertson',
      'Cindy Cindyson',
      'Dick Dickenson',
      'Erica Ericcson',
      'Francisco Domingo Carlos Andres Sebastián d\'Anconia',
      'Joe Johnson',
      'Karlee Carlson',
      'Mark Marcussen',
      'Zoey Zimmerman'
    ]
    const component = render(<Shift employees={employees}/>, { wrapper: BrowserRouter })
    await fireEvent.click(component.getByTestId('employee-Assignment-Button'))

    await waitFor(async () => {
      await fireEvent.click(component.getByTestId('shift-menu-1'))
    })

    expect(screen.getByTestId('assigned-person').outerHTML).toContain('Abraham Abrahamsen')
  })

  it('Employee Unassigned From Shift', async () => {
    const employees = [
      'Abraham Abrahamsen',
      'Bob Robertson',
      'Cindy Cindyson',
      'Dick Dickenson',
      'Erica Ericcson',
      'Francisco Domingo Carlos Andres Sebastián d\'Anconia',
      'Joe Johnson',
      'Karlee Carlson',
      'Mark Marcussen',
      'Zoey Zimmerman'
    ]
    const component = render(<Shift employees={employees}/>, { wrapper: BrowserRouter })
    await fireEvent.click(component.getByTestId('employee-Assignment-Button'))

    await waitFor(async () => {
      await fireEvent.click(component.getByTestId('shift-menu-1'))
    })

    await fireEvent.click(component.getByTestId('employee-Unassignment-Button'))

    expect(screen.getByTestId('assigned-person').outerHTML).toContain('[unassigned]')
  })

  it('12 Hour Date Test', async () => {
    const startTime = new Date()
    const endTime = new Date()

    startTime.setHours(12)
    startTime.setMinutes(0)
    endTime.setHours(16)
    endTime.setMinutes(30)

    const component0 = render(<Shift startTime={startTime} endTime={endTime}/>, { wrapper: BrowserRouter })
    expect(component0.baseElement.outerHTML).toContain('12:00 PM to 4:30 PM')

    startTime.setHours(0)
    startTime.setMinutes(0)
    endTime.setHours(8)
    endTime.setMinutes(45)

    const component1 = render(<Shift startTime={startTime} endTime={endTime}/>, { wrapper: BrowserRouter })
    expect(component1.baseElement.outerHTML).toContain('12:00 AM to 8:45 AM')
  })
})
