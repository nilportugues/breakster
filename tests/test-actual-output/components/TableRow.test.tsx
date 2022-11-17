
import * as React from "react";
import {TableRow} from "./TableRow";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('TableRow Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<TableRow />)
    expect(container).toMatchInlineSnapshot(`
<div>
  <tr>
    <td>
      First
    </td>
    <td>
      Second
    </td>
    <td>
      Third
    </td>
  </tr>
</div>
`)
  })
})
