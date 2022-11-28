
import * as React from "react";
import {BuyButton} from "./BuyButton";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { I18nextProvider } from 'react-i18next';

const i18n = undefined;

describe('BuyButton Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<I18nextProvider i18n={i18n}><BuyButton /></I18nextProvider>)
    expect(container).toMatchInlineSnapshot(`
<div>
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
`)
  })
})
