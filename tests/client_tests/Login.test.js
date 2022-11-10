import React from 'React'
import { render, fireEvent } from '@testing-library/react'

import Log from '../../client/Components/Log.jsx'

describe('Tests for  <Login />', () => {
  let count
  const callback = (updateCount) => {
    count = updateCount
  }
  beforeEach(() => {
    count = 0
  })
  it('Initial Render', () => {
    const component = render(<Log />)
    expect(component.baseElement.outerHTML).toContain('Remember Me')
  })

  it('Textbox On Email provides text', async () => {
    const component = render(<Log count={count} />)

    await fireEvent.input(component.getByTestId('Email Address'))

    expect(component.getByTestId('Email Address').outerHTML).toContain('Au1')
  })
  it('Button clicked with count and callback prop provided', async () => {
    const component = render(<Log count={count} callback ={callback} />)

    await fireEvent.click(component.getByTestId('click-me-btn'))

    expect(count).toBe(1)
  })
})
