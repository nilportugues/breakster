import { useTranslation } from 'react-i18next';
import * as React from "react";

import { UserInfo } from "./UserInfo";

export type BuyButtonProps = {};




export const BuyButton = React.memo(function ({ ...props }: BuyButtonProps) {


  const { t } = useTranslation();

return (
    <div>
            <button>{t('buy')}</button>
            <div>
              <div>{t('buy_as')}</div>
              
              <UserInfo />
            </div>
          </div>);

});