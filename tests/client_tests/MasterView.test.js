// Day component exists
import MasterView from '../../client/Pages/MasterView.jsx'
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

describe('Tests for <MasterView />', () => {
  it('Init render', async () => {
    const component = render(<MasterView />, { wrapper: BrowserRouter })

    expect(document.body).toBe(component.baseElement)
  })

  it('UpdateWeekdates', async () => {
    const component = render(<MasterView />, { wrapper: BrowserRouter })

    const mondayDate = new Date()
    const sundayNextDate = new Date()
    mondayDate.setDate(((mondayDate.getDate() - mondayDate.getDay()) + 1) - 7)
    sundayNextDate.setDate((sundayNextDate.getDate() + (7 - sundayNextDate.getDay())) - 7)

    await fireEvent.click(component.getByTestId('previous-week-button'))

    expect(component.getByTestId('week-changer').outerHTML).toContain(
      (mondayDate.getMonth() + 1) + '/' + (mondayDate.getDate()) + ' thru ' + (sundayNextDate.getMonth() + 1) + '/' + (sundayNextDate.getDate())
    )
  })

  it('Show/Hide ShiftView Modal', async () => {
    const component = render(<MasterView />, { wrapper: BrowserRouter })

    await fireEvent.click(component.getByTestId('day-button-Sunday'))

    expect(component.getByTestId('shift-view-dialog')).not.toBeNull()

    await fireEvent.click(component.getByTestId('shift-view-close'))

    await waitFor(() => {
      expect(component.queryByTestId('shift-view-dialog')).toBeNull()
    })
  })
})
