import { Button, Card, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import React from 'react';
import apiCollection from '../../resources/apiCollection';
import { putApi } from '../../resources/ApiContent';
const { Option } = Select;
const { TextArea } = Input;

export default function UpdateCustomerProfile(props) {
    const [form] = Form.useForm();

    const onFinish = async values => {
        try {
            const result = await putApi(apiCollection.customer, values, props.userObject.ID_USER);
            if (result.data.success) {
                message.success(result.data.message);
                onReset();
                props.handleCancel();
                props.fetchData();
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
                title="Update Customer Profile"
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
                                initialValues={props.userObject}
                                layout="vertical"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                form={form}
                            >
                                <Form.Item
                                    name="TITLE"
                                    label="Title"
                                >
                                    <Select placeholder="Please select the title" onChange={handleChange}>
                                        <Option value={"Mr"}>Mr</Option>
                                        <Option value={"Ms"}>Ms</Option>
                                        <Option value={"Mrs"}>Mrs</Option>
                                        <Option value={"Miss"}>Miss</Option>
                                        <Option value={"Dr"}>Dr</Option>
                                        <Option value={"Professor"}>Professor</Option>
                                        <Option value={"Mx"}>Mx</Option>

                                    </Select>
                                </Form.Item >
                                <Form.Item
                                    name="FIRST_NAME"
                                    label="First Name"
                                    rules={[{ required: true, message: 'Please input your first name!' }]}
                                >
                                    <Input placeholder="Please Enter your First Name" />
                                </Form.Item >
                                <Form.Item
                                    name="LAST_NAME"
                                    label="Last Name"
                                    rules={[{ required: true, message: 'Please input your last name!' }]}
                                >
                                    <Input placeholder="Please Enter your Last Name" />
                                </Form.Item >
                                <Form.Item
                                    name="ADDRESS_LINE_1"
                                    label="Address Line 1"
                                    rules={[{ required: true, message: 'Please input your address!' }]}
                                >
                                    <TextArea placeholder="Please Enter your Address Line 1" />
                                </Form.Item >
                                <Form.Item
                                    name="ADDRESS_LINE_2"
                                    label="Address Line 2"
                                >
                                    <TextArea placeholder="Please Enter your Address Line 2" />
                                </Form.Item >
                                <Form.Item
                                    name="CITY"
                                    label="City"
                                    rules={[{ required: true, message: 'Please input your address!' }]}
                                >
                                    <Input placeholder="Please Enter your City" />
                                </Form.Item >
                                <Form.Item
                                    name="POSTAL_CODE"
                                    label="Postal Code"
                                    rules={[{ required: true, message: 'Please input your postal code!' }]}
                                >
                                    <Input placeholder="Please Enter your Postal Code" />
                                </Form.Item >

                                <Form.Item
                                    name="CONTACT_DETAIL_1"
                                    label="Contact Number"
                                    rules={[{ required: true, pattern: new RegExp("^(\\+\\d{1,2})?\\(?\\d{3}\\)?\\d{3}\\d{4}$"), message: "Invalid Contact Number" }]}
                                >
                                    <Input placeholder="Please Enter your Phone Number" />
                                </Form.Item>

                                <Form.Item
                                    name="CONTACT_DETAIL_2"
                                    label="Contact Number Land"
                                    rules={[{ pattern: new RegExp("^(\\+\\d{1,2})?\\(?\\d{3}\\)?\\d{3}\\d{4}$"), message: "Invalid Contact Number" }]}
                                >
                                    <Input placeholder="Please Enter your Land Phone Number" />
                                </Form.Item>
                                <Form.Item
                                    name="NIC"
                                    label="NIC"
                                    rules={[{ required: true, message: 'Please input your NIC!' }, { pattern: new RegExp("^([0-9]{9}[x|X|v|V]|[0-9]{12})$"), message: "Invalid NIC Number", }]}
                                >
                                    <Input placeholder="Please enter your NIC" />
                                </Form.Item>
                                <Form.Item
                                    name="EMAIL"
                                    label="Email"
                                    rules={[{ required: true, type: 'email' }]}
                                >
                                    <Input placeholder="Please enter your Email Address" />
                                </Form.Item>

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

