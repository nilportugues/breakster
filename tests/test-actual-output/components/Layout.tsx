
import * as React from "react";

import { LayoutHeader } from "./LayoutHeader"
import { Product } from "./Product"
import { Table } from "./Table"

export type LayoutProps = {

}


export function Layout({ ...props}: LayoutProps){
    
      
    return (
      <div>

        <LayoutHeader />

        <Product />

        <Table />

        <Table />
      </div>
    );  
}
