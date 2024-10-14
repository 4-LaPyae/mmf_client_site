import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd';
import Navbar from './navbar/NavBar';
import FooterBar from './footer/FooterBar';
import UContent from './content/UContent';
const { Header, Content, Footer } = Layout;

const UserDashboard = () => {
 
  return (
    <>
    <Navbar />
    <UContent/>
    <FooterBar/>
    </>
  );
};
export default UserDashboard;