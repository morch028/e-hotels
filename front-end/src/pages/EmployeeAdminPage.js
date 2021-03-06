import React from "react";
import {AsyncItems} from "../components/AsyncItems";
import EmployeeTable from "../components/EmployeeAdminComponents/EmployeeTable";
import "./EmployeeAdminPage.css";


export default class EmployeeAdminPage extends React.Component {

  state = {
    loadingEmployees: false,
    employees: []
  };


  loadEmployees = async elementId => {
    //todo: add try-catch
    this.setState({loadingEmployees: true});
    const response = await fetch("/api/employees");
    if (!response.ok) {
      throw new Error(`Unable to fetch employees [${response.status}]`);
    }
    const employees = await response.json();
    this.setState({employees, loadingEmployees: false});

    // Scroll to item of interest
    if (elementId) {
      window.location.hash = null;
      window.location.hash = elementId;
    }
  };

  async componentDidMount() {
    await this.loadEmployees();
  }

  render() {
    return <main className="main-content main-content--clear">
      <ul className="no-bullet">
        <AsyncItems loading={this.state.loadingEmployees}
                    placeholderMessage="No employees"
                    loadingMessage="Loading employees...">

              {Object.entries(this.state.employees).map(([hotelChainName, employees]) =>
                <EmployeeTable
                  key={hotelChainName}
                  hotelChainName={hotelChainName}
                  employees={employees}
                  onSave={this.loadEmployees}/>)}

        </AsyncItems>
      </ul>
    </main>;
  }
}