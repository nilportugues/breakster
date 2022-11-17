
import * as React from "react";
import {IndexPage} from "./IndexPage";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('IndexPage Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<IndexPage />)
    expect(container).toMatchInlineSnapshot(`
<div>
  <div>
    <div>
      <header>
        <div>
          User
        </div>
        <div />
      </header>
      <div>
        <div>
          Product name
        </div>
        <div>
          Product price
        </div>
        <div>
          Product count
        </div>
        <div>
          <button>
            buy
          </button>
          <div>
            <div>
              Buy as
            </div>
            <div />
          </div>
        </div>
      </div>
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
  </div>
</div>
`)
  })
})
