import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Popconfirm, Space, Switch, Table } from 'antd';
import React from 'react';
import Highlighter from 'react-highlight-words';
import apiCollection from '../../resources/apiCollection';
import { putApi } from '../../resources/ApiContent';
export default class TableComponent extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        visible: false,
        userObject: {}
    };

    fetchData = () => {
        this.props.fetchData();
    }


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
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
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
          </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
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

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    onChange = async (row) => {
        console.log('switch to', !row.STATUS);
        var statusObj = {
            STATUS: !row.STATUS
        }
        try {
            const result = await putApi(apiCollection.category, statusObj, row.ID_CATEGORY);
            if (result.data.success) {
                message.success(result.data.message);
                this.fetchData()
            } else {
                message.error(result.data.message);
            }

        } catch (errors) {
            console.log(errors)

        }
    }

    render() {

        const tableData = this.props.tableData;
        const columns = [
            {
                title: 'Account Number',
                dataIndex: 'AC_NO',
                key: 'AC_NO',
                ...this.getColumnSearchProps('AC_NO'),
            },
            {
                title: 'Customer Name',
                dataIndex: 'FIRST_NAME',
                key: 'FIRST_NAME',
                ...this.getColumnSearchProps('FIRST_NAME'),
            },
            {
                title: 'Account Balance',
                dataIndex: 'BALANCE',
                key: 'BALANCE',
                ...this.getColumnSearchProps('BALANCE'),
            },

        ];
        return (
            <div>
                <Table columns={columns} dataSource={tableData} />
            </div>
        )
    }
}
