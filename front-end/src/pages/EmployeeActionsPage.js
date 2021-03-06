import React from "react";
import "./EmployeeActionsPage.css";
import CheckIn from "../components/EmployeeActionsComponents/CheckIn";
import {toast} from "react-toastify";

export default class EmployeeActionsPage extends React.Component {

  state = {
    employee: null,
    loadingEmployee: true
  };

  loadEmployee = async employeeId => {
    const response = await fetch(`/api/employees/${employeeId}`);
    if (!response.ok) {
      throw new Error("Unable to fetch employee");
    }
    const employee = await response.json();
    this.setState({employee, loadingEmployee: false});
  };

  async componentDidMount() {
    const {employeeId} = this.props.match.params;
    try {
      await this.loadEmployee(employeeId);
    } catch (error) {
      console.error(error);
      toast.error("Unable to login");
    }
  }

  render() {
    if (this.state.loadingEmployee) {
      return <main className="main-content">
        <h2 className="spinner">Logging in...</h2>
      </main>
    } else {
      const {hotelChainName, givenName, familyName, id: employeeId} = this.state.employee;
      return <main className="main-content main-content--clear">
        <h2>Logged in as: {givenName} {familyName}</h2>
        <CheckIn employeeId={employeeId} hotelChainName={hotelChainName}/>
      </main>
    }
  }
}