import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd';
import Navbar from './navbar/NavBar';
import FooterBar from './footer/FooterBar';
import UContent from './content/UContent';

const UserAppLayout = () => {
 
  return (
    <Layout>
      <Navbar />
      <UContent/>
      <FooterBar/>   
    </Layout>
  );
};
export default UserAppLayout;
