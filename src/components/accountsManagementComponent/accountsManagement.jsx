import { Button, Col, Divider, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import LayoutComponent from "../../layouts/Layout";
import apiCollection from "../../resources/apiCollection";
import { getApi } from "../../resources/ApiContent";
import CreateAccount from "./createAccount";
import TableComponent from "./TableComponent";

const { Title } = Typography;

export default function CategoryComponent() {
  const [visible, setVisible] = useState(false);
  const [categoryObj, setCategoryObj] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  //Method to fetch all data
  const fetchData = async () => {
    try {
      const result = await getApi(apiCollection.account, null);
      setCategoryObj(result.data.result);
    } catch (errors) {
      console.log(errors);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleView = () => {
    setVisible(true);
  };
  return (
    <LayoutComponent>
      <div>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={4} md={4} >
            <img src="./icons/category.svg" alt="Title" style={{ width: 135 }} />
          </Col>
          <Col xs={24} sm={16} md={16}>
            <Title level={2}>Accounts Management</Title>
            <Title
              level={4}
              style={{ color: "#D3D3D3", fontSize: 14, marginTop: "-2%" }}
            >
              Accounts Management
            </Title>
          </Col>
          <Col xs={24} sm={4} md={4} >
            <Button
              type="primary"
              shape="round"
              style={{ marginTop: "4%" }}
              size={"middle"}
              onClick={handleView}
            >
              Create Account
            </Button>
          </Col>
        </Row>
        <Divider />
        <TableComponent tableData={categoryObj} fetchData={fetchData} />
        <CreateAccount
          visible={visible}
          handleCancel={handleCancel}
          fetchData={fetchData}
        />
      </div>
    </LayoutComponent>
  );
}
