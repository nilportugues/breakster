
import * as React from "react";


export type TableRowProps = {};




export const TableRow = React.memo(function ({ ...props }: TableRowProps) {


  return (
    <tr>
              <td>{t('first')}</td>
              <td>{t('second')}</td>
              <td>{t('third')}</td>
            </tr>);

});