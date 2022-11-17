
import * as React from "react";
import {Product} from "./Product";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Product Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<Product />)
    expect(container).toMatchInlineSnapshot()
  })
})
