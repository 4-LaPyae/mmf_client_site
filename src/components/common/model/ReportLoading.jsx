import React from "react";
import { Modal, Button, Typography, Space } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PoweroffOutlined } from "@ant-design/icons";

export default function ReportLoading() {

  return (
    <Modal
      open={true} // `open` in Material-UI is `visible` in Ant Design
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
        <Typography.Title level={4} style={{ color: "red" }}>
          Report Loading...
        </Typography.Title>
        <Button type="primary" icon={<PoweroffOutlined />} loading />
      </Space>
    </Modal>
  );
}
