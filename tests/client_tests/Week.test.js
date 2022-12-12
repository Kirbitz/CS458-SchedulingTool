// Week component exists
import Week from '../../client/Components/Week.jsx'
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

it('Test for <Week />', () => {
  const component = render(<Week passClickedDate={() => {}} />, { wrapper: BrowserRouter })

  expect(document.body).toBe(component.baseElement)
})
