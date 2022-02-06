import { Button, Card, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import apiCollection from '../../resources/apiCollection';
import { postApi, getApi } from '../../resources/ApiContent';
const { Option } = Select;
export default function CreateCustomerProfile(props) {
    const [form] = Form.useForm();
    const [customerObj, setCustomerObj] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    //Method to fetch all data
    const fetchData = async () => {
        try {
            const result = await getApi(apiCollection.customer, null);
            setCustomerObj(result.data.result);
        } catch (errors) {
            console.log(errors);
        }
    };

    const onFinish = async values => {
        try {
            const result = await postApi(apiCollection.account, values);
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

    const onReset = () => {
        form.resetFields();

    };

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    return (
        <div>
            <Modal
                title="Create Account"
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
                                    name="ID_USER"
                                    label="Customer"
                                >
                                    <Select
                                        allowClear={true}
                                        showSearch
                                        onChange={handleChange}
                                        placeholder="Please select the Customer"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }>
                                        {customerObj
                                            .map(customer => {
                                                return (
                                                    <Option value={customer.ID_USER}>{customer.FIRST_NAME + " " + customer.LAST_NAME}</Option>
                                                )
                                            })}

                                    </Select>
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

