
import * as React from "react";
import type { ComponentType } from "react";
import { TableRow } from "./TableRow"


type Props = {

}


export const Table: ComponentType<Props> = () => {
  
    
      
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
