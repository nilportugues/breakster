import { useTranslation } from 'react-i18next';
import * as React from "react";

import { BuyButton } from "./BuyButton";

export type ProductProps = {};




export const Product = React.memo(function ({ ...props }: ProductProps) {


  const { t } = useTranslation();

return (
    <div>
          <div>{t('product_name')}</div>
          <div>{t('product_price')}</div>
          <div>{t('product_count')}</div>

          <BuyButton />

        </div>);

});