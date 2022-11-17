
import * as React from "react";
import {Layout} from "./Layout";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Layout Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<Layout />)
    expect(container).toMatchInlineSnapshot()
  })
})
