import EntryPoint from '../../client/EntryPoint.jsx'
import React from 'react'
import { render } from '@testing-library/react'

it('Test for <EntryPoint />', () => {
  const component = render(<EntryPoint />)

  expect(document.body).toBe(component.baseElement)
})

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))
