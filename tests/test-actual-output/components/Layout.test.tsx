
import * as React from "react";
import {Layout} from "./Layout";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { I18nextProvider } from 'react-i18next';

const i18n = undefined;

describe('Layout Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<I18nextProvider i18n={i18n}><Layout /></I18nextProvider>)
    expect(container).toMatchInlineSnapshot(`
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
`)
  })
})
