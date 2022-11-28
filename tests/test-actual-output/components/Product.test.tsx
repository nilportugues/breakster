
import * as React from "react";
import {Product} from "./Product";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { I18nextProvider } from 'react-i18next';

const i18n = undefined;

describe('Product Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<I18nextProvider i18n={i18n}><Product /></I18nextProvider>)
    expect(container).toMatchInlineSnapshot(`
<div>
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
</div>
`)
  })
})
