import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components

import Header from "components/Headers/Header.js";
import TransferForm from "components/TransferForm/TransferForm";

const Dashboard = (props) => {
  return (
    <>
      <Header />
      {/* Page content */}
      <TransferForm />
      <Container></Container>
    </>
  );
};

Dashboard.layout = Admin;

export default Dashboard;
