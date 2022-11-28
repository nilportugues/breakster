
import * as React from "react";
import {LayoutHeader} from "./LayoutHeader";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { I18nextProvider } from 'react-i18next';

const i18n = undefined;

describe('LayoutHeader Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<I18nextProvider i18n={i18n}><LayoutHeader /></I18nextProvider>)
    expect(container).toMatchInlineSnapshot(`
<div>
  <header>
    <div>
      user
    </div>
    <div />
  </header>
</div>
`)
  })
})
