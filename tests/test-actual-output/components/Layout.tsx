
import * as React from "react";

import { LayoutHeader } from "./LayoutHeader";
import { Product } from "./Product";
import { Table } from "./Table";

export type LayoutProps = {};




export const Layout = React.memo(function ({ ...props }: LayoutProps) {


  return (
    <div>

        <LayoutHeader />

        <Product />

        <Table />

        <Table />
      </div>);

});