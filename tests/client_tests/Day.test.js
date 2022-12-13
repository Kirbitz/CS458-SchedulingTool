// Day component exists
import Day from '../../client/Components/Day.jsx'
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

it('Test for <Day />', () => {
  const component = render(<Day passClickedDate={() => {}} />, { wrapper: BrowserRouter })

  expect(document.body).toBe(component.baseElement, { wrapper: BrowserRouter })
})
