
import * as React from "react";
import {UserInfo} from "./UserInfo";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('UserInfo Component', () => {
  
  it('matches the snapshot', () => {
    const { container } = render(<UserInfo />)
    expect(container).toMatchInlineSnapshot()
  })
})
