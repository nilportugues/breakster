
import * as React from "react";

import { BuyButton } from "./BuyButton";

export type ProductProps = {};




export const Product = React.memo(function ({ ...props }: ProductProps) {


  return (
    <div>
          <div>{t('product_name')}</div>
          <div>{t('product_price')}</div>
          <div>{t('product_count')}</div>

          <BuyButton />

        </div>);

});