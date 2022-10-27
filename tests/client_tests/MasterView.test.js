// masterView page exists
import MasterView from '../../client/Pages/MasterView.jsx'
import React from 'react'
import { render } from '@testing-library/react'

it('Test for <MasterView />', () => {
  const component = render(<MasterView />)

  expect(document.body).toBe(component.baseElement)
})
