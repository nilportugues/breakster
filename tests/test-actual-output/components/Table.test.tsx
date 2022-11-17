
import * as React from "react";
import {Table} from "./Table";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Table Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<Table />)
    expect(container).toMatchInlineSnapshot()
  })
})
