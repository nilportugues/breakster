
import * as React from "react";

import { UserInfo } from "./UserInfo"

export type LayoutHeaderProps = {

}


export function LayoutHeader({ ...props}: LayoutHeaderProps){
    
      
    return (
      <header>
          <div>User</div>

          <UserInfo />

        </header>
    );  
}
