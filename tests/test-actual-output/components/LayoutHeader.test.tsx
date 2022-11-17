
import * as React from "react";
import {LayoutHeader} from "./LayoutHeader";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('LayoutHeader Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<LayoutHeader />)
    expect(container).toMatchInlineSnapshot(`
<div>
  <header>
    <div>
      User
    </div>
    <div />
  </header>
</div>
`)
  })
})
