import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardComponent from "../components/dashboardComponent/Dashboard";
import LoginComponent from "../components/loginComponent/app";
import CustomerManagementComponent from "../components/customerManagementComponent/customerManagement";
import TransactionManagementComponent from "../components/transactionManagementComponent/transactionManagement";
import AccountManagement from "../components/accountsManagementComponent/accountsManagement"

export default function Router() {
  return (
    <Switch>
      <Route path="/dashboard" component={DashboardComponent} />
      <Route path="/accountsManagement" component={AccountManagement} />
      <Route path="/transactionManagement" component={TransactionManagementComponent} />
      <Route path="/customerManagement" component={CustomerManagementComponent} />
      <Route path="/" component={LoginComponent} />
    </Switch>
  );
}
