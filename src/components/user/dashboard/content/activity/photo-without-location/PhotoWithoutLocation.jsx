import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch, TimePicker, Typography } from "antd";
import React, { Fragment, useState } from 'react';
import FileUpload from "../../../../../product-management/category-registration/file-upload";
import { ArrowLeftOutlined } from '@ant-design/icons'; // Import the icon you want to use
import './Style.css';
const { TextArea } = Input;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const ComponentB = ({ setShowComponent }) => {
    const [imageData, setImageData] = useState();
    const [errorStatus, setErrorStatus] = useState('');
    const [msg, setMsg] = useState("");
    const [checkImage, setCheckImage] = useState(false);
    const [checkManual, setCheckManual] = useState(false);
    const [form] = Form.useForm();

    const handleBack = () => {
        setShowComponent(false)
    }


    const handleFileChange = async (file) => {
        if (file.length > 0) {
            setCheckImage(true);
            const base64Data = await getBase64(file[0].originFileObj);
            setImageData(base64Data);
        } else {
            setCheckImage(false);
        }
    }

    const onFinish = async (values) => {
        console.log(values);
    }
    const onChange = (checked) => {
        setCheckManual(!checked)
        //console.log(`switch to ${checked}`);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className="form-container" style={{ padding: '20px' }}>
            <Typography.Title
                level={3}
                style={{
                    paddingBottom: 10,
                    margin: 0,
                    textAlign: 'center',
                }}
            >
            Photo Without Location
            </Typography.Title>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
            >
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Upload Image" name="image_file">
                            <FileUpload
                                setErrorStatus={setErrorStatus}
                                onFileChange={handleFileChange}
                                buttonText={"click-to-upload"}
                                setMsg={setMsg}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Date"
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select Date!',
                                },
                            ]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="From"
                            name="fromTime"
                            rules={[{ required: true, message: 'This field is required' }]}
                        >
                            <TimePicker
                                format="h:mm a"
                                use12Hours
                                placeholder="Select time"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="To"
                            name="toTime"
                            rules={[{ required: true, message: 'This field is required' }]}
                        >
                            <TimePicker
                                format="h:mm a"
                                use12Hours
                                placeholder="Select time"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Village PCODE"
                    name="village_pcode"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required',
                        },
                    ]}
                >
                    <Input placeholder="Enter Village PCode" style={{ width: '100%' }} />
                </Form.Item>

                <Row style={{ paddingBottom: 5 }}>
                    <Col span={24}>
                        <Switch
                            checkedChildren="manual"
                            unCheckedChildren="manual"
                            onChange={onChange}
                        />
                    </Col>
                </Row>

                <Form.Item
                    label="Township"
                    name="township"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required',
                        },
                    ]}
                >
                    <Input disabled={checkManual} placeholder="Enter Township" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Village Tract"
                    name="village_tract"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required',
                        },
                    ]}
                >
                    <Input disabled={checkManual} placeholder="Enter Village Tract" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Village"
                    name="village"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required',
                        },
                    ]}
                >
                    <Input disabled={checkManual} placeholder="Enter Village" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="type_person">
                    <Select
                        defaultValue="lucy"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' }
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Reporting" name="report">
                    <TextArea rows={4} placeholder="Reporting*"/>
                </Form.Item>

                <Row justify="space-between">
                    <Button
                        onClick={handleBack}
                        icon={<ArrowLeftOutlined />}
                        style={{ marginTop: 20, marginRight: 5 }}
                    >
                        Back
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '150px', marginTop: 20 }}
                    >
                        Entry
                    </Button>
                </Row>
            </Form>
        </div>
    )
}
export default ComponentB;