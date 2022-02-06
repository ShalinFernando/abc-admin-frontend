import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Tooltip,
  Divider,
  Popconfirm,
  message,
} from "antd";
import Highlighter from "react-highlight-words";
import { deleteApi } from "../../resources/ApiContent";
import apiCollection from "../../resources/apiCollection";
import UpdateCustomerProfile from "./updateCustomerProfile";
import React from "react";
export default class TableComponent extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    visible: false,
    userObject: {},
  };

  deleteCustomer = async (row) => {
    try {
      const result = await deleteApi(apiCollection.customer, row.ID_USER);
      if (result.data.success) {
        message.success(result.data.message);
        this.props.fetchData();
      } else {
        message.error(result.data.message);
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  handleModalShow(row) {
    this.setState({
      userObject: row,
      visible: true,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  fetchData = () => {
    this.props.fetchData();
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const tableData = this.props.tableData;
    const columns = [
      {
        title: "Title",
        dataIndex: "TITLE",
        key: "TITLE",
        responsive: ['md'],
        ...this.getColumnSearchProps("TITLE"),
      },
      {
        title: "First Name",
        dataIndex: "FIRST_NAME",
        key: "FIRST_NAME",
        ...this.getColumnSearchProps("FIRST_NAME"),
      },
      {
        title: "Last Name",
        dataIndex: "LAST_NAME",
        key: "LAST_NAME",
        responsive: ['md'],
        ...this.getColumnSearchProps("LAST_NAME"),
      },
      {
        title: "Contact Number",
        dataIndex: "CONTACT_DETAIL_1",
        key: "CONTACT_DETAIL_1",
        ...this.getColumnSearchProps("CONTACT_DETAIL_1"),
      },
      {
        title: "NIC",
        dataIndex: "NIC",
        key: "NIC",
        ...this.getColumnSearchProps("NIC"),
      },
      {
        title: "Email",
        dataIndex: "EMAIL",
        key: "EMAIL",
        responsive: ['md'],
        ...this.getColumnSearchProps("EMAIL"),
      },
      {
        title: "Settings",
        render: (rowObj) => (
          <span>
            <Tooltip placement="topLeft" title="Are you sure to edit?">
              <EditOutlined onClick={() => this.handleModalShow(rowObj)} />
            </Tooltip>

            <Divider type="vertical" />

            <Tooltip placement="bottomLeft" title="Are you sure to delete ?">
              <Popconfirm
                title="Sure to delete ?"
                onConfirm={() => this.deleteCustomer(rowObj)}
              >
                <DeleteOutlined />
              </Popconfirm>
            </Tooltip>
          </span>
        ),
      },
    ];
    return (
      <div>
        <Table columns={columns} dataSource={tableData} />
        {this.state.visible ? (
          <UpdateCustomerProfile
            visible={this.state.visible}
            handleCancel={this.handleCancel}
            fetchData={this.fetchData}
            userObject={this.state.userObject}
          />
        ) : null}
      </div>
    );
  }
}
