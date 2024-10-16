import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Input, Button, Avatar, Upload, Form, message } from 'antd';
const { TextArea } = Input;

import { values } from 'lodash';
import FileUpload from '../../product-management/category-registration/file-upload';
import { UploadOutlined } from "@ant-design/icons";
import { UserOutlined } from '@ant-design/icons';
import { useUpdateAdminMutation, useUpdateProfileAdminMutation } from '../../../features/feature_apis/adminApi';
import { useDispatch } from 'react-redux';
import { setUserDetail } from '../../../features/userSlice';

// Function to convert file to base64
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const TabOne = ({ user }) => {
  const [form] = Form.useForm();

  const [userData, setUserData] = useState();
  const [imageData, setImageData] = useState();
  const [errorStatus, setErrorStatus] = useState('');
  const [msg, setMsg] = useState("");
  const [checkImage, setCheckImage] = useState(false);

  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const [updateProfileAdmin, { isLoading }] = useUpdateProfileAdminMutation();

  const onFinish = async (values) => {
    const { id, name, email, photo, username, address, ...rest } = userData;
    const updateData = {
      name: values.name,
      phone:values.phone,
      email,
      username,
      address:values.address,
      photo: !checkImage ? null : imageData
    }
    // console.log(updateData);return;
    updateProfileAdmin({ id, data: updateData })
      .unwrap()
      .then((res) => {
        if (!res.error) {
          dispatch(setUserDetail(res.data));
          messageApi.success(res.message);
          form.resetFields();
        } else {
          messageApi.error(res.message);
        }
      });

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

  useEffect(()=>{
    if(user){
      setUserData(user);
      setImageData(user?.photo)
      form.setFieldsValue(user);
    }
  }
  ,[user,form])
  // Handle form validation failure
  // const onFinishFailed = () => messageApi.error('Form validation failed!');
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        // initialValues={{
        //   name: userData?.name,
        //   email: userData?.email,
        //   phone: userData?.phone,
        //   address:userData?.address
        // }}
        onFinish={onFinish}
        //  onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
      >


        {/* <Row gutter={[16, 16]} style={{ paddingBottom: '10px' }}>
          <Col span={8}>
            <Typography.Text className="fw-semibold text-muted">First Name : </Typography.Text>
          </Col>
          <Col span={16}>
            <Input
              value="Tester"
              placeholder="Enter Your FirstName"
              required
            />
          </Col>
        </Row> */}
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Typography.Text className="fw-semibold text-muted">Full Name : </Typography.Text>
          </Col>
          <Col span={16}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter name!',

                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} >
          <Col span={8}>
            <Typography.Text className="fw-semibold text-muted">
              Email :
            </Typography.Text>
          </Col>
          <Col span={16} className="d-flex align-items-center">
            <Form.Item
              name="email"
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Typography.Text className="fw-semibold text-muted">Phone : </Typography.Text>
          </Col>
          <Col span={16}>
            <Form.Item
              name="phone"

            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Typography.Text className="fw-semibold text-muted">Address : </Typography.Text>
          </Col>
          <Col span={16}>
            <Form.Item label="Address" name="address">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Typography.Text className="fw-semibold text-muted">
              Photo :
            </Typography.Text>
          </Col>
          <Col span={16}>
            {/* <Form.Item name="profile">
        <Input
                      accept="image/*"
                      // inputProps={{ accept: "image/*" }}
                      id="contained-button-file"
                      type="file"
                      name="profile"
                      sx={{
                        display: "none",
                      }}
                      onChange={imageInputChange}
                    />
      <Avatar
        src={imageData}
        icon={<UserOutlined />}
        shape="square"
        size={100}
        style={{ cursor: 'pointer', marginTop: 16 ,marginBottom :16}}
      />
      </Form.Item> */}
            <Form.Item name="profile_image">
              <FileUpload
                setErrorStatus={setErrorStatus}
                onFileChange={handleFileChange}
                buttonText={"click-to-upload"}
                setMsg={setMsg}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ paddingBottom: '5px' }}>
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
              Save Changes
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
};

export default TabOne;