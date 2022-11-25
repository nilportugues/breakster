import { useTranslation } from 'react-i18next';
import * as React from "react";

import { UserInfo } from "./UserInfo";

export type LayoutHeaderProps = {};




export const LayoutHeader = React.memo(function ({ ...props }: LayoutHeaderProps) {


  const { t } = useTranslation();

return (
    <header>
          <div>{t('user')}</div>

          <UserInfo />

        </header>);

});