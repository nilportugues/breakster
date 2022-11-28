
import * as React from "react";
import {TableRow} from "./TableRow";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { I18nextProvider } from 'react-i18next';

const i18n = undefined;

describe('TableRow Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<I18nextProvider i18n={i18n}><TableRow /></I18nextProvider>)
    expect(container).toMatchInlineSnapshot(`
<div>
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
</div>
`)
  })
})
