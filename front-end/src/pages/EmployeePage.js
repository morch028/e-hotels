import React from "react";
import {AsyncItems} from "../components/AsyncItems";
import EmployeeTable from "../components/EmployeeComponents/EmployeeTable";


export default class EmployeePage extends React.Component {
  state = {
    loadingEmployees: false,
    employees: []
  };


  async componentDidMount() {
    this.setState({loadingEmployees: true});
    const response = await fetch("/api/employees");
    if (!response.ok) {
      throw new Error(`Unable to fetch employees [${response.status}]`);
    }
    const employees = await response.json();
    this.setState({employees, loadingEmployees: false});
  };

  render() {
    return <main className="main-content">
      <h2>Employees</h2>
      <ul className="no-bullet">
        <AsyncItems loading={this.state.loadingEmployees}
                    placeholderMessage="No employees"
                    loadingMessage="Loading employees...">

              {Object.entries(this.state.employees).map(([hotelChainName, employees]) =>
                <EmployeeTable key={hotelChainName} hotelChainName={hotelChainName} employees={employees}/>)}

        </AsyncItems>
      </ul>
    </main>;
  }
}