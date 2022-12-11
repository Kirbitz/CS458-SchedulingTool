import WeekChanger from '../../client/Components/WeekChanger.jsx'
// import WeekChanger, { goBackOneWeek, goForwardOneWeek } from '../../client/Components/WeekChanger.jsx'

import React from 'react'
import { fireEvent, render } from '@testing-library/react'

describe('Tests for <WeekChanger />', () => {
  it('Initial Render', () => {
    const component = render(<WeekChanger date={ new Date() } passNewDate={() => {}}/>)
    const mondayDate = new Date()
    const sundayNextDate = new Date()

    mondayDate.setDate((mondayDate.getDate() - mondayDate.getDay()) + 1)
    sundayNextDate.setDate(sundayNextDate.getDate() + (7 - sundayNextDate.getDay()))
    if (new Date().getDay() === 0) {
      mondayDate.setDate(mondayDate.getDate() - 7)
      sundayNextDate.setDate(sundayNextDate.getDate() - 7)
    }

    expect(document.body).toBe(component.baseElement)

    expect(component.baseElement.outerHTML).toContain(
      (mondayDate.getMonth() + 1) + '/' + (mondayDate.getDate()) + ' thru ' + (sundayNextDate.getMonth() + 1) + '/' + (sundayNextDate.getDate())
    )
  })

  it('Previous Week Button Test', async () => {
    let called = false
    const mockPassNewDate = (data) => { called = true }

    const component = render(<WeekChanger date={ new Date() } passNewDate={ mockPassNewDate } />)
    const mondayDate = new Date()
    const sundayNextDate = new Date()
    mondayDate.setDate(((mondayDate.getDate() - mondayDate.getDay()) + 1) - 7)
    sundayNextDate.setDate((sundayNextDate.getDate() + (7 - sundayNextDate.getDay())) - 7)
    if (new Date().getDay() === 0) {
      mondayDate.setDate(mondayDate.getDate() - 7)
      sundayNextDate.setDate(sundayNextDate.getDate() - 7)
    }

    await fireEvent.click(component.getByTestId('previous-week-button'))

    expect(component.baseElement.outerHTML).toContain(
      (mondayDate.getMonth() + 1) + '/' + (mondayDate.getDate()) + ' thru ' + (sundayNextDate.getMonth() + 1) + '/' + (sundayNextDate.getDate())
    )
    expect(called).toBe(true)
  })
  it('Next Button Test', async () => {
    let called = false
    const mockPassNewDate = (data) => { called = true }

    const component = render(<WeekChanger date={ new Date() } passNewDate={ mockPassNewDate } />)
    const mondayDate = new Date()
    const sundayNextDate = new Date()
    mondayDate.setDate(((mondayDate.getDate() - mondayDate.getDay()) + 1) + 7)
    sundayNextDate.setDate((sundayNextDate.getDate() + (7 - sundayNextDate.getDay())) + 7)
    if (new Date().getDay() === 0) {
      mondayDate.setDate(mondayDate.getDate() - 7)
      sundayNextDate.setDate(sundayNextDate.getDate() - 7)
    }

    await fireEvent.click(component.getByTestId('next-week-button'))

    expect(component.baseElement.outerHTML).toContain(
      (mondayDate.getMonth() + 1) + '/' + (mondayDate.getDate()) + ' thru ' + (sundayNextDate.getMonth() + 1) + '/' + (sundayNextDate.getDate())
    )
    expect(called).toBe(true)
  })
})
