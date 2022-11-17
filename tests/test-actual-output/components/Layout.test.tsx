
import * as React from "react";
import {Layout} from "./Layout";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Layout Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<Layout />)
    expect(container).toMatchInlineSnapshot(`
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
`)
  })
})
