
import * as React from "react";

import { UserInfo } from "./UserInfo"
import { Product } from "./Product"
import { Table } from "./Table"

export type LayoutProps = {

}


export function Layout({ ...props}: LayoutProps){
    
      
    return (
      <div>

        <header>
          <div>User</div>

          <UserInfo />

        </header>

        <Product />

        <Table />

        <Table />
      </div>
    );  
}
