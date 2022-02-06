import React from "react";
import { Layout } from "antd";
import HeaderComponent from "./../components/HeaderComponent";

const { Footer, Content, Header } = Layout;

function LayoutComponent(props) {
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header>
        <HeaderComponent />
      </Header>
      <Content
        style={{
          padding: "0 20px",
          marginTop: "20px",
          marginBottom: 80,
          backgroundColor: "white",
        }}
      >
        {props.children}
      </Content>
      <Footer
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        Copyright © 2021 ABC Banking
      </Footer>
    </Layout>
  );
}

export default LayoutComponent;
