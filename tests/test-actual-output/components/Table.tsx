
import * as React from "react";

import { TableRow } from "./TableRow";

export type TableProps = {};




export const Table = React.memo(function ({ ...props }: TableProps) {


  return (
    <table>
          <thead>
            <tr>
              <td>{t('header_first')}</td>
              <td>{t('header_second')}</td>
              <td>{t('header_third')}</td>
            </tr>
          </thead>
          <tbody>
            <TableRow />
          </tbody>
        </table>);

});