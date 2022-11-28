
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
          user
        </div>
        <div />
      </header>
      <div>
        <div>
          product_name
        </div>
        <div>
          product_price
        </div>
        <div>
          product_count
        </div>
        <div>
          <button>
            buy
          </button>
          <div>
            <div>
              buy_as
            </div>
            <div />
          </div>
        </div>
      </div>
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
  </div>
</div>
`)
  })
})
