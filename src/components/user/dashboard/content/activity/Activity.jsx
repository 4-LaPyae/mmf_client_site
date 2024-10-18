// import { Fragment } from "react";

// const Activity  = ()=>{
//     return (
//         <Fragment>
//         Activity
//         </Fragment>
//     )
// }
// export default Activity;
import React, { useState } from 'react';
import { Button, Flex, Input, Radio, Space, Typography } from 'antd';
import ComponentA from './photo-with-location/PhotoWithLocation';
import ComponentB from './photo-without-location/PhotoWithoutLocation';
import ComponentC from './without-photo/WithoutPhoto';
const Activity = () => {
    const [value, setValue] = useState(1);
    const [showComponent, setShowComponent] = useState(false);
    const onChange = (e) => {
        // console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const handleClick = () => {
        setShowComponent(true); // Show the new component when button is clicked
    };
    const renderComponent = () => {
        switch (value) {
            case 1:
                return <ComponentA setShowComponent={setShowComponent} />;
            case 2:
                return <ComponentB setShowComponent={setShowComponent}/>;
            case 3:
                return <ComponentC setShowComponent={setShowComponent}/>;
            default:
                return null;
        }
    };
    return (
        <Flex style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin:"0 auto",
            marginBottom:100,
        }}>
            {
                !showComponent ? (
                <div style={{background:'white',padding:'20px 60px'}}> 
                    <div>
                    <Typography.Title
                        level={3}
                        style={{
                            margin: 0,
                            textAlign: 'center',
                            marginTop:20,
                            marginBottom:30
                        }}
                    >
                        Select Activity
                    </Typography.Title>
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            <Radio value={1} style={{ fontSize: '20px' }}>Photo With Location</Radio>
                            <Radio value={2} style={{ fontSize: '20px' }}>Photo Without Location</Radio>
                            <Radio value={3} style={{ fontSize: '20px' }}>Without Photo</Radio>
                        </Space>
                    </Radio.Group>
                </div>
                    <div style={{ padding: 10,textAlign:'center' }}>
                        <Button type="primary" onClick={handleClick} style={{ marginTop: 20 }}>
                            Select
                        </Button>
                    </div></div>) : (renderComponent())
            }


        </Flex>
    );
};
export default Activity;