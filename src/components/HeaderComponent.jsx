import {
  CustomerServiceOutlined, DashboardOutlined,
  LogoutOutlined,
  RobotOutlined, UserOutlined
} from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HeaderComponent() {
  const logoutOnChange = () => {
    localStorage.clear();
  }
  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      window.location.href = '/login'
    }
  }, []);
  return (
    <Row gutter={24}>
      <Col span={24}>
        <Menu mode="horizontal" theme="dark">
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="customerManagement" icon={<UserOutlined />}>
            <Link to="/customerManagement"> Customer Management</Link>
          </Menu.Item>
          <Menu.Item key="accountsManagement" icon={<RobotOutlined />}>
            <Link to="/accountsManagement"> Accounts Management</Link>
          </Menu.Item>
          <Menu.Item key="transactionManagement" icon={<CustomerServiceOutlined />}>
            <Link to="/transactionManagement"> Transaction Management</Link>
          </Menu.Item>
          <Menu.Item
            key="/"
            icon={<LogoutOutlined />}
            style={{ float: "right" }}
          >
            <Link to="/" onClick={logoutOnChange}> Logout</Link>
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  );
}
