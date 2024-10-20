import React, { useState } from "react";
import { Modal, Button, Typography, Space } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";

export default function SuccessReport({open,setOpen}) {
    const nextHandler = () => {
        setOpen(false)
      };
  return (
    <Modal
      open={open} // `open` in Material-UI is `visible` in Ant Design
      footer={null}  // Disable default footer buttons
      centered       // Centers the modal on the screen
      closable={false}  // Disables the close button on the top right
    >
      <Space
        direction="vertical"
        align="center"
        size="middle"
        style={{ width: "100%" }}
      >
        <Typography.Title level={4} style={{ color: "green" }}>
          Report Created Success
        </Typography.Title>
        <Button type="primary" icon={<CheckOutlined />} onClick={nextHandler}>OK</Button>
      </Space>
    </Modal>
  );
}
