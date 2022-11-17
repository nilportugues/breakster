
import * as React from "react";

import { TableRow } from "./TableRow"

export type TableProps = {

}


export function Table({ ...props}: TableProps){
    
      
    return (
      <table>
          <thead>
            <tr>
              <td>Header first</td>
              <td>Header second</td>
              <td>Header third</td>
            </tr>
          </thead>
          <tbody>
            <TableRow />
          </tbody>
        </table>
    );  
}
