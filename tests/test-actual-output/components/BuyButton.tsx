
import * as React from "react";

import { UserInfo } from "./UserInfo"

export type BuyButtonProps = {

}


export function BuyButton({ ...props}: BuyButtonProps){
    
      
    return (
      <div>
            <button>buy</button>
            <div>
              <div>Buy as</div>
              
              <UserInfo />
            </div>
          </div>
    );  
}
