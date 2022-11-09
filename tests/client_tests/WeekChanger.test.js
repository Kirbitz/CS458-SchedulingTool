import WeekChanger, { goBackOneWeek, goForwardOneWeek } from '../../client/Components/WeekChanger.jsx'
import React from 'react'
import { render } from '@testing-library/react'

describe('Tests for <WeekChanger />', () => {
  it('<WeekChanger /> Initial Render', () => {
    const component = render(<WeekChanger />)

    expect(document.body).toBe(component.baseElement)
    expect(component.baseElement.outerHTML).toContain(' thru ')
  })

  it('<WeekChanger /> goBackOneWeek() Function Test', () => {
    jest.mock('../../client/Components/WeekChanger.jsx', () => ({ goBackOneWeek: jest.fn() }))
    const previousWeekDate = new Date()
    previousWeekDate.setDate(previousWeekDate.getDate() - 7)

    expect(goBackOneWeek(new Date())).toBe(previousWeekDate)
  })

  it('<WeekChanger /> goForwardOneWeek() Function Test', () => {
    jest.mock('../../client/Components/WeekChanger.jsx', () => ({ goForwardOneWeek: jest.fn() }))
    const nextWeekDate = new Date()
    nextWeekDate.setDate(nextWeekDate.getDate() + 7)

    expect(goForwardOneWeek(new Date())).toBe(nextWeekDate)
  })
  // TODO: Add test for Previous Week button
  // TODO: Add test for Next Week button
})
