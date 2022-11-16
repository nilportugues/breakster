
import * as React from "react";
import type { ComponentType } from "react";
import { BuyButton } from "./BuyButton"


type Props = {

}


export const Product: ComponentType<Props> = () => {
  
    
      
    return (
      <div>
          <div>Product name</div>
          <div>Product price</div>
          <div>Product count</div>

          <BuyButton />

        </div>
    );  
}
