
import * as React from "react";
import {IndexPage} from "./IndexPage";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('IndexPage Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<IndexPage />)
    expect(container).toMatchInlineSnapshot()
  })
})
