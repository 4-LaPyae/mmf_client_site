import React, { Fragment } from 'react';
import { Card, Row, Col,Tabs } from 'antd';
import ProfileCard from './ProfileCard';
import TabOne from './TabOne';
import TabTwo from './TabTwo';
import { useSelector } from 'react-redux';


const Profile = () => {

  const { user } = useSelector((state) => state.user);

  const items = [
    {
      key: '1',
      label: 'Setting',
      children: <TabOne user={user}/>,
    },
    {
      key: '2',
      label: 'Reset Password',
      children: <TabTwo user={user}/>,
    }
  ];
  const onChange = (key) => {
    //console.log(key);
  };
  return (
    <Fragment>
      <Row justify="space-around" style={{ width: "100%" }}>
        <Col xs={24} sm={24} md={8} lg={6} xl={6} style={{marginBottom:"20px"}}>
         <ProfileCard user={user}/>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Card className="p-9">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  )

};
export default Profile;
