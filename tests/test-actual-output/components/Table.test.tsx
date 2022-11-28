
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
          header_first
        </td>
        <td>
          header_second
        </td>
        <td>
          header_third
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          first
        </td>
        <td>
          second
        </td>
        <td>
          third
        </td>
      </tr>
    </tbody>
  </table>
</div>
`)
  })
})
