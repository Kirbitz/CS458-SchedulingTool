// timeline component exists
import Timeline from '../../client/Components/Timeline.jsx'
import React from 'react'
import { render } from '@testing-library/react'

it('Test for <Timeline />', () => {
  const component = render(<Timeline />)

  expect(document.body).toBe(component.baseElement)
})
