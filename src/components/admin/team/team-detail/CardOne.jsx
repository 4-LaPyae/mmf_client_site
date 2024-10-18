import React, { Fragment } from 'react';
import { Card, Avatar, Typography, Row, Col, Badge, Flex } from 'antd';
import { UserOutlined, TeamOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const teamMember = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  supervisor: 'Jane Smith',
  totalMembers: 10,
};

const CardOne = ({data}) => (
    <Fragment>
    <Card
    style={{ width: 350, borderRadius: 10 }}
  >
    <Card.Meta
      avatar={<Avatar size={64} icon={<UserOutlined />} />}
      title={
        <Title level={4} style={{ margin: 0 }}>
          {data?.name}
        </Title>
      }
      description={
        <div>
          <Row gutter={[0, 8]}>
            <Col span={24}>
              <MailOutlined style={{ marginRight: 8 }} />
              <Text>{data?.supervisor?.email}</Text>
            </Col>
            <Col span={24}>
              <Text strong>Supervisor:</Text> <Text>{data?.supervisor?.name}</Text>
            </Col>
            <Col span={24}>
              <TeamOutlined style={{ marginRight: 8 }} />
              <Text>Total Members: {data?.members?.length}</Text>
            </Col>
          </Row>
        </div>
      }
    />
    </Card>
    <Flex>
        
    </Flex>
    </Fragment>
    
);

export default CardOne;
