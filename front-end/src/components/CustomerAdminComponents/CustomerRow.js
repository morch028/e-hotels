import React from "react";
import Address from "../Address";
import {formatDateShort} from "../../services/format-service";
import ClickableRow from "../ClickableRow";


const CustomerRow = props => {
  const {id, ssn, sin, givenName, familyName, registeredOn, address, onSelectRow, className} = props;

  return <ClickableRow
    className={"striped row-top customer-row " + className}
      onClick={() => onSelectRow(props)}>
    <td><strong>{id}</strong></td>
    <td>
      {givenName} {familyName}
    </td>
    <td>{ssn}</td>
    <td>{sin}</td>
    <td>{formatDateShort(new Date(registeredOn))}</td>
    <td><Address {...address}/></td>
  </ClickableRow>
};
export default CustomerRow;