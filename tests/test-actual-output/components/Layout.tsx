
import * as React from "react";
import type { ComponentType } from "react";
import { UserInfo } from "./UserInfo"
import { Product } from "./Product"
import { Table } from "./Table"


type Props = {

}


export const Layout: ComponentType<Props> = () => {
  
    
      
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
