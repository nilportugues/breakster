
import * as React from "react";
import {BuyButton} from "./BuyButton";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('BuyButton Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<BuyButton />)
    expect(container).toMatchInlineSnapshot()
  })
})