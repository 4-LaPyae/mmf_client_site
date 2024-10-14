import React from 'react';
import { Form, Input, Button, Divider, Typography, Row, Col } from 'antd';
import { GoogleOutlined, AppleOutlined } from '@ant-design/icons';
import './SignIn.css'; // Include any custom styling if necessary

const { Title, Text, Link } = Typography;

const UserLogin = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="sign-in-container">
      <Row justify="center" align="middle" className="sign-in-row">
        {/* Left Side: Image and Logo */}
        <Col xs={0} lg={12} className="sign-in-bg">
          {/* <div className="sign-in-logo">
            <img src="data:image/jpeg;base64,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" alt="Logo" />
          </div> */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '3rem',
              fontFamily: "Lobster",
              fontWeight: '500',
              fontStyle: 'italic',
              margin:0
            }}>HELLO</h2>
            <h2 className='sign-in-text' level={1} style={{
              color: 'white',
              fontSize: '2rem',
              fontFamily: "Lobster",
              fontWeight: '500',
              fontStyle: 'italic',
            }}>MMF WEB APPLICATION</h2>
            {/* <Text style={{ color: 'white' }}>In this kind of post, the blogger introduces a person they’ve interviewed and provides some background information about the interviewee and their work following this is a transcript of the interview.</Text> */}
          </div>
        </Col>

        {/* Right Side: Sign-In Form */}
        <Col xs={24} lg={12} className="sign-in-form">
          <div className="form-wrapper">
            <Title level={2}>Sign In</Title>
            {/* Sign-In Form */}
            <Form
              name="sign_in"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
            >
              {/* Email */}
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Email address is required' }]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              {/* Password */}
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'The password is required' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserLogin;

