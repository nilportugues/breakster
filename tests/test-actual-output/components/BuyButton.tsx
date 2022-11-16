
import * as React from "react";
import type { ComponentType } from "react";
import { UserInfo } from "./UserInfo"


type Props = {

}


export const BuyButton: ComponentType<Props> = () => {
  
    
      
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
