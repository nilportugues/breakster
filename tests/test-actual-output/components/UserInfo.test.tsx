
import * as React from "react";
import {UserInfo} from "./UserInfo";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { I18nextProvider } from 'react-i18next';

const i18n = undefined;

describe('UserInfo Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<I18nextProvider i18n={i18n}><UserInfo /></I18nextProvider>)
    expect(container).toMatchInlineSnapshot(`
<div>
  <div />
</div>
`)
  })
})
