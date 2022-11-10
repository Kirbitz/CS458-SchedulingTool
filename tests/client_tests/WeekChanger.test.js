import WeekChanger from '../../client/Components/WeekChanger.jsx'
// import WeekChanger, { goBackOneWeek, goForwardOneWeek } from '../../client/Components/WeekChanger.jsx'

import React from 'react'
import { fireEvent, render } from '@testing-library/react'

describe('Tests for <WeekChanger />', () => {
  it('Initial Render', () => {
    const component = render(<WeekChanger />)
    const mondayDate = new Date()
    const sundayNextDate = new Date()

    mondayDate.setDate((mondayDate.getDate() - mondayDate.getDay()) + 1)
    sundayNextDate.setDate(sundayNextDate.getDate() + (7 - sundayNextDate.getDay()))

    expect(document.body).toBe(component.baseElement)
    expect(component.baseElement.outerHTML).toContain(
      (mondayDate.getMonth() + 1) + '/' + (mondayDate.getDate()) + ' thru ' + (sundayNextDate.getMonth() + 1) + '/' + (sundayNextDate.getDate())
    )
  })

  it('Previous Week Button Test', async () => {
    const component = render(<WeekChanger />)
    const mondayDate = new Date()
    const sundayNextDate = new Date()
    mondayDate.setDate(((mondayDate.getDate() - mondayDate.getDay()) + 1) - 7)
    sundayNextDate.setDate((sundayNextDate.getDate() + (7 - sundayNextDate.getDay())) - 7)

    await fireEvent.click(component.getByTestId('previous-week-button'))

    expect(component.baseElement.outerHTML).toContain(
      (mondayDate.getMonth() + 1) + '/' + (mondayDate.getDate()) + ' thru ' + (sundayNextDate.getMonth() + 1) + '/' + (sundayNextDate.getDate())
    )
  })
  it('Next Button Test', async () => {
    const component = render(<WeekChanger />)
    const mondayDate = new Date()
    const sundayNextDate = new Date()
    mondayDate.setDate(((mondayDate.getDate() - mondayDate.getDay()) + 1) + 7)
    sundayNextDate.setDate((sundayNextDate.getDate() + (7 - sundayNextDate.getDay())) + 7)

    await fireEvent.click(component.getByTestId('next-week-button'))

    expect(component.baseElement.outerHTML).toContain(
      (mondayDate.getMonth() + 1) + '/' + (mondayDate.getDate()) + ' thru ' + (sundayNextDate.getMonth() + 1) + '/' + (sundayNextDate.getDate())
    )
  })
})
