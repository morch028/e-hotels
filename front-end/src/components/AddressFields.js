import React from "react";

const AddressFields = ({state, onChange}) => <>
  <label>
    Street Number
    <input name="streetNumber"
           type="number"
           required
           value={state.streetNumber}
           min={0}
           onChange={onChange}/>
  </label>
  <label>
    Street Name
    <input name="streetName"
           type="text"
           maxLength="100"
           required
           value={state.streetName}
           onChange={onChange}/>
  </label>
  <label>
    City
    <input name="city"
           type="text"
           maxLength="100"
           required
           value={state.city}
           onChange={onChange}/>
  </label>
  <label>
    Country
    <input name="country"
           type="text"
           maxLength="100"
           required
           value={state.country}
           onChange={onChange}/>
  </label>
</>;


export default AddressFields;
