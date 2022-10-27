// Week component exists
import Week from '../../client/Components/Week.jsx'
import React from 'react'
import { render } from '@testing-library/react'

it('Test for <Week />', () => {
  const component = render(<Week />)

  expect(document.body).toBe(component.baseElement)
})
