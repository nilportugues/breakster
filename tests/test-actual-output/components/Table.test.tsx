
import * as React from "react";
import {Table} from "./Table";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Table Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<Table />)
    expect(container).toMatchInlineSnapshot(`
<div>
  <table>
    <thead>
      <tr>
        <td>
          Header first
        </td>
        <td>
          Header second
        </td>
        <td>
          Header third
        </td>
      </tr>
    </thead>
    <tbody>
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
    </tbody>
  </table>
</div>
`)
  })
})
