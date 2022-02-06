import { Button, Card, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import apiCollection from '../../resources/apiCollection';
import { postApi, getApi } from '../../resources/ApiContent';
const { Option } = Select;
const { TextArea } = Input;

export default function CreateItem(props) {
    const [form] = Form.useForm();
    const [accountObj, setAccountObj] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    //Method to fetch all data
    const fetchData = async () => {
        try {
            const resultAc = await getApi(apiCollection.account, null);
            setAccountObj(resultAc.data.result);
        } catch (errors) {
            console.log(errors);
        }
    };
    const onFinish = async values => {
        try {
            const result = await postApi(apiCollection.transaction, values);
            if (result.data.success) {
                message.success(result.data.message);
                onReset();
                props.fetchData();
                props.handleCancel();
            } else {
                message.error(result.data.message);
            }

        } catch (errors) {
            console.log(errors)

        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    const onReset = () => {
        form.resetFields();
    };

    return (
        <div>
            <Modal
                title="Create Transaction"
                visible={props.visible}
                footer={null}
                onCancel={props.handleCancel}
            >
                <Row gutter={[24, 24]} >
                    <Col span={24}>
                        <Card
                            bordered={false}
                            className="userForm"
                        >

                            <Form
                                name="userForm"
                                initialValues={{ count: 0, visible: false }}
                                layout="vertical"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                form={form}
                            >
                                <Form.Item
                                    name="ID_AC"
                                    label="Account Number"
                                    rules={[{ required: true, message: 'Please select a account number!' }]}
                                >
                                    <Select
                                        allowClear={true}
                                        showSearch
                                        placeholder="Please select the Account Number"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }>
                                        {accountObj
                                            .map(account => {
                                                return (
                                                    <Option value={account.ID_AC}>{account.AC_NO + " : " + account.FIRST_NAME + " " + account.LAST_NAME}</Option>
                                                )
                                            })}

                                    </Select>
                                </Form.Item >
                                <Form.Item
                                    name="TYPE"
                                    label="Transaction Type"
                                    rules={[{ required: true, message: 'Please select a type!' }]}
                                >
                                    <Select
                                        allowClear={true}
                                        showSearch
                                        placeholder="Please select the Type"
                                        onChange={handleChange}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }>
                                        <Option value="DEPOSIT">Deposit</Option>
                                        <Option value="WITHDRAW">Withdraw</Option>
                                    </Select>
                                </Form.Item >
                                <Form.Item
                                    name="AMOUNT"
                                    label="Amount"
                                    rules={[{ required: true, message: 'Please input the amount!' }]}
                                >
                                    <Input type='number' placeholder="Please Enter the Amount" />
                                </Form.Item >
                                <Form.Item >
                                    <Button htmlType="button" type="primary" shape="round" size="middle" onClick={onReset} style={{ float: "left" }}>
                                        Reset
                                </Button>
                                    <Button type="primary" htmlType="submit" shape="round" size="middle" style={{ float: "right" }} >
                                        Submit
                                </Button>
                                </Form.Item>
                            </Form >
                        </Card>
                    </Col>
                </Row>
            </Modal>
        </div >
    )
}

