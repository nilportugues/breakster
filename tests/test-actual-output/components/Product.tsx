
import * as React from "react";

import { BuyButton } from "./BuyButton"

export type ProductProps = {

}


export function Product({ ...props}: ProductProps){
    
      
    return (
      <div>
          <div>Product name</div>
          <div>Product price</div>
          <div>Product count</div>

          <BuyButton />

        </div>
    );  
}
