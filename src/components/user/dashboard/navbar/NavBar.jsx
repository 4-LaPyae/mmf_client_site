import React, { useState } from 'react';
import { Button, Layout, Typography } from 'antd';
import './navbar.css';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import Confirmation from '../../../common/confirmation';
import { LogoutOutlined } from '@ant-design/icons';
const { Header } = Layout;


const Navbar = () => {
  const [modalOpen,setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
		dispatch(clearUser())
		navigate('/login')
	}
  // Handle confirmation box
  const isConfirmSave = () => {
    setModalOpen(true);
};
  return (
    <>
     <Confirmation
                modalTitle="You will be return to the login screen."
                open={modalOpen}
                setOpen={setModalOpen}
                confirmAction={logoutHandler}
            />
      <Header className='header-container main' style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: '100%',
        backgroundColor: '#7ec624',
        height:'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{display:'flex',textAlign:'center'}}>
            <img alt="brand logo" src={"/src/assets/images/logo/mmf.png"} width={100} style={{padding:5}}>
            </img>
          </div>
          <div>
            <Button className='header-button' style={{ background: "#7ec624", color: 'white', marginRight: '5px' }}>OPTION</Button>
            <Button 
            className='header-button' 
            style={{ background: "#7ec624", color: 'white', }} 
            onClick={isConfirmSave}
            icon={<LogoutOutlined />}
            >
              LOGOUT
            </Button>
          </div>
        </div>
      </Header>
    </>
  );
};

export default Navbar;
