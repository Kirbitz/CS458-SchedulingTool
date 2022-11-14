// Day component exists
import Day from '../../client/Components/Day.jsx'
import React from 'react'
import { render } from '@testing-library/react'

it('Test for <Day />', () => {
  const component = render(<Day />)

  expect(document.body).toBe(component.baseElement)
})
