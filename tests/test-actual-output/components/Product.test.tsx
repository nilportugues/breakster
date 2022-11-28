
import * as React from "react";
import {Product} from "./Product";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Product Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<Product />)
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
