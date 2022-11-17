
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
</div>
`)
  })
})
