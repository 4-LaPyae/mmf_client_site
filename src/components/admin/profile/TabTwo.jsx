import React, { useState } from 'react';
import { Typography, Row, Col, Input, Button, Form, message } from 'antd';
import { values } from 'lodash';
import { useUpdateAdminPasswordMutation } from '../../../features/feature_apis/adminApi';


const TabTwo = ({user}) => {

  const [userId,setUserId] = useState(user?.id);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [postAdminPassword,{isLoading}] = useUpdateAdminPasswordMutation();
  const onFinish = async (values)=>{
    const updateValue = {...values,id:userId}
    postAdminPassword(updateValue)
        .unwrap()
        .then((res) => {
          if (!res.error) {
            messageApi.success(res.message);
            form.resetFields();
          }else{
            messageApi.error(res.message);
          }
          })
  }
  // const onFinishFailed = () => messageApi.error('Form validation failed!');

    return <>
    {contextHolder}
    <Form
      form={form}
     onFinish={onFinish}
    //  onFinishFailed={onFinishFailed}
     layout="vertical"
     autoComplete="off"
    >
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Typography.Text className="fw-semibold text-muted">Old Password : </Typography.Text>
        </Col>
        <Col span={16}>
          <Form.Item
          name="old_password"
          rules={[
            {
              required: true,
              message: 'Please enter old password!',

            },
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Typography.Text className="fw-semibold text-muted">New Password : </Typography.Text>
        </Col>
        <Col span={16}>
        <Form.Item
          name="new_password"
          rules={[
            {
              required: true,
              message: 'Please enter new password!',

            },
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Typography.Text className="fw-bold text-muted">
            Confirm Password :
          </Typography.Text>
        </Col>
        <Col span={16} className="d-flex align-items-center">
        <Form.Item
          name="confirm_password"
          rules={[
            {
              required: true,
              message: 'Please enter confirm_password password!',

            },
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
        </Col>
        <Col span={16}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ width: "150px" }} // Set button width to 200px
            block
          >
            Change Password
          </Button>
        </Col>
      </Row>
      </Form>
    </>;
  };

  export default TabTwo;