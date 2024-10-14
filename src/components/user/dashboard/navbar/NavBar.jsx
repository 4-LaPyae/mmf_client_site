import React from 'react';
import { Button,Layout, Typography } from 'antd';
import './navbar.css';
const { Header } = Layout;
const { Title } = Typography;


const Navbar = () => {
  return (
    <Layout className='main'>
      <Header className='header-container' style={{   position: "fixed",
                top: 0,
                zIndex: 0,
        width: '100%', backgroundColor: '#764ABC'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title className='header-title' level={4} style={{ color: '#fff', margin: 0 }}>
            MMF Web App
          </Title>
          <div>
            <Button className='header-button' style={{background:"#764ABC",color:'white',marginRight:'5px'}}>OPTION</Button>
            <Button className='header-button' style={{background:"#764ABC",color:'white',}}>LOGOUT</Button>
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
