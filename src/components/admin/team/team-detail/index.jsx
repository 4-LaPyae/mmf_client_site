import { Button, Card, Col, Flex, Row } from 'antd';
import React, { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CardOne from './CardOne';
import CardTwo from './CardTwo';
import AnimatedLayout from '../../../common/animated-layout';
const { Meta } = Card;


const TeamDetail = () => {
  
    const location = useLocation();

    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // Navigate back to the previous page
    };
  
    const { data } = location?.state;
    //  console.log({ data });
  return (
    // <AnimatedLayout>
    <Fragment>
      {/* <Flex style={{ width: "100%" }}> */}
        {/* <Col xs={24} sm={24} md={8} lg={6} xl={6} style={{marginBottom:"20px"}}> */}
            <CardOne data={data}/>
        {/* </Col> */}
        {/* <Col xs={24} sm={24} md={16} lg={16} xl={16}> */}
        <div style={{padding:10}}>
        <CardTwo data={data}/>
        </div>
        {/* </Col> */}
      {/* </Flex> */}
      <Row justify="center" style={{marginTop:20}}>
      <Button type="primary" onClick={handleGoBack}>
         Go Back
        </Button>
      </Row>
    </Fragment>
    // </AnimatedLayout>

  );
};

export default TeamDetail;

