
import * as React from "react";

import { Layout } from "./Layout";

export type IndexPageProps = {};




export const IndexPage = React.memo(function ({ ...props }: IndexPageProps) {


  return (
    <div>
      <Layout />
    </div>);

});