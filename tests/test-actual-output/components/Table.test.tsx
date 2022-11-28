
import * as React from "react";
import {Table} from "./Table";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { I18nextProvider } from 'react-i18next';

const i18n = undefined;

describe('Table Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<I18nextProvider i18n={i18n}><Table /></I18nextProvider>)
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
