import React from 'react';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import HotelChainAdminPage from "./pages/HotelChainAdminPage";
import CustomerAdminPage from "./pages/CustomerAdminPage";
import EmployeeAdminPage from "./pages/EmployeeAdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import EmployeeActionsPage from "./pages/EmployeeActionsPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Header from "./components/Header";
import './App.css';
import './Forms.css';
import CustomerActionsPage from "./pages/CustomerActionsPage";
import CalendarPage from "./pages/CalendarPage";


class App extends React.Component {
  render() {
    return <BrowserRouter>
      <>
        <Header/>
        <Switch>
          <Route path="/" component={HomePage} exact={true}/>
          <Route path="/admin/hotel-chains" component={HotelChainAdminPage}/>
          <Route path="/admin/customers" component={CustomerAdminPage}/>
          <Route path="/admin/employees" component={EmployeeAdminPage}/>
          <Route path="/employee/:employeeId" component={EmployeeActionsPage}/>
          <Route path="/customer/:customerId" component={CustomerActionsPage}/>
          <Route path="/calendar" component={CalendarPage}/>

          <Route component={NotFoundPage}/>
        </Switch>
        <ToastContainer/>
      </>
    </BrowserRouter>;
  }
}

export default App;
