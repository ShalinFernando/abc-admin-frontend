import {
  SearchOutlined
} from "@ant-design/icons";
import {
  Button,
  Input,





  message, Space,
  Table
} from "antd";
import React from "react";
import Highlighter from "react-highlight-words";
import apiCollection from "../../resources/apiCollection";
import { deleteApi, putApi } from "../../resources/ApiContent";
export default class TableComponent extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    visible: false,
    userObject: {},
  };

  deleteCustomer = async (row) => {
    try {
      const result = await deleteApi(apiCollection.item, row.ID_ITEM);
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
      visible: true,
      userObject: row,
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

  onChange = async (row) => {
    console.log("switch to", !row.STATUS);
    var statusObj = {
      STATUS: !row.STATUS,
    };
    try {
      const result = await putApi(apiCollection.item, statusObj, row.ID_ITEM);
      if (result.data.success) {
        message.success(result.data.message);
        this.fetchData();
      } else {
        message.error(result.data.message);
      }
    } catch (errors) {
      console.log(errors);
    }
  };
  render() {
    const tableData = this.props.tableData;
    const columns = [
      {
        title: "Transaction Date",
        dataIndex: "TRANSACTION_DATE",
        key: "TRANSACTION_DATE",
        ...this.getColumnSearchProps("TRANSACTION_DATE"),
      },
      {
        title: "Account Number",
        dataIndex: "AC_NO",
        key: "AC_NO",
        ...this.getColumnSearchProps("AC_NO"),
      },
      {
        title: "Customer Name",
        dataIndex: "FIRST_NAME",
        key: "FIRST_NAME",
        ...this.getColumnSearchProps("FIRST_NAME"),
      },
      {
        title: "Transaction Type",
        dataIndex: "TYPE",
        key: "TYPE",
        ...this.getColumnSearchProps("TYPE"),
      },
      {
        title: "Transaction Amount",
        dataIndex: "AMOUNT",
        key: "AMOUNT",
        ...this.getColumnSearchProps("AMOUNT"),
      },
    ];
    return (
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
    );
  }
}
