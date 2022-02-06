import { Avatar, Card, Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import apiCollection from "../../resources/apiCollection";
import { getApi } from "../../resources/ApiContent";
import LayoutComponent from "./../../layouts/Layout";

const { Title } = Typography;

export default function DashboardComponent() {
  const [customerCount, setCustomerCount] = useState(0);
  const [accountCount, setAccountCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  //Method to fetch all data
  const fetchData = async () => {
    try {
      const customerCount = await getApi(apiCollection.customerCount, null);
      const accountCount = await getApi(apiCollection.accountCount, null);
      const transactionCount = await getApi(apiCollection.transactionCount, null);
      setCustomerCount(customerCount.data.result[0].COUNT);
      setAccountCount(accountCount.data.result[0].COUNT);
      setTransactionCount(transactionCount.data.result[0].COUNT);
    } catch (errors) {
      console.log(errors);
    }
  };



  return (
    <LayoutComponent>
      <div>
        <Row gutter={[24, 24]} style={{ textAlign: "center" }} justify='center'>
          <Col xs={24} sm={10} md={6}>
            <Card hoverable={true} style={{ height: 150 }}>
              <Row gutter={24}>
                <Col span={10} style={{ alignItems: "center", marginTop: 10 }}>
                  <Avatar size={80} src="/icons/user.png" />
                </Col>
                <Col span={14}>
                  <Title level={2}>{customerCount}</Title>
                  <Row gutter={24}>
                    <Col span={24}>
                      <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                        Total User Count
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={10} md={6}>
            <Card hoverable={true} style={{ height: 150 }}>
              <Row gutter={24}>
                <Col span={10} style={{ alignItems: "center", marginTop: 10 }}>
                  <Avatar size={80} src="/icons/arrived.png" />
                </Col>
                <Col span={14}>
                  <Title level={2}>{accountCount}</Title>
                  <Row gutter={24}>
                    <Col span={24}>
                      <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                        Total Accounts Count
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={10} md={6}>
            <Card hoverable={true} style={{ height: 150 }}>
              <Row gutter={24}>
                <Col span={10} style={{ alignItems: "center", marginTop: 10 }}>
                  <Avatar size={80} src="/icons/valid.png" />
                </Col>
                <Col span={14}>
                  <Title level={2}>{transactionCount}</Title>
                  <Row gutter={24}>
                    <Col span={24}>
                      <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                        Total Transaction Count
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </LayoutComponent>
  );
}
