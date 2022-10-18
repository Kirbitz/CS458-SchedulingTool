import EntryPoint from '../../client/EntryPoint.jsx'
import React from 'react'
import { render } from '@testing-library/react'

it('Test for <EntryPoint />', () => {
  const component = render(<EntryPoint />)

  expect(document.body).toBe(component.baseElement)
})
