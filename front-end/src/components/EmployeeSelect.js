import React from "react";
import {toast} from "react-toastify";


export default class EmployeeSelect extends React.Component {
  state = {
    loadingEmployees: true,
    employees: []
  };

  async componentDidMount() {
    try {
      const {hotelChainName} = this.props;
      this.setState({loadingEmployees: true});
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/employees`);
      if (!response.ok) {
        throw new Error(`Unable to fetch employees ${response.status}`);
      }
      const employees = await response.json();
      this.setState({employees, loadingEmployees: false});
    } catch (error) {
      console.error("Unable to fetch employees", error);
      toast.error("Unable to fetch employees");
      this.setState({loadingEmployees: false});
    }
  }

  render() {
    const {loadingEmployees, employees} = this.state;
    const {selectedEmployee, onChange, required, name} = this.props;
    if (loadingEmployees) {
      return <div className="spinner">Loading employees...</div>
    } else {
      return <select className="simple-input"
                     name={name}
                     value={selectedEmployee}
                     onChange={onChange}
                     required={required}>
        <option className="hidden-option" value=""/>
        {employees.map(employee =>
          <option value={employee.id} key={employee.id}>
          {employee.givenName} {employee.familyName}
        </option>)}
      </select>
    }
  }
}