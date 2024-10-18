// import React, { useState } from 'react';
// import { Layout, Menu } from 'antd';
// import { HistoryOutlined, HeartOutlined, InboxOutlined } from '@ant-design/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChildReaching, faMap, faReceipt } from '@fortawesome/free-solid-svg-icons';

// const { Footer } = Layout;

// const FooterBar = () => {
//   const [selectedKey, setSelectedKey] = useState('recents');

//   const handleMenuClick = (e) => {
//     setSelectedKey(e.key);
//   };

//   return (
//     <Footer style={{position: 'fixed',bottom: 0, left: 0, right: 0, padding: 0 }}>
//       <Menu
//         mode="horizontal"
//         selectedKeys={[selectedKey]}
//         onClick={handleMenuClick}
//         style={{ display: 'flex', justifyContent: 'center',  padding: '0.5rem 0',color:'white' }}
//       >
//         <Menu.Item key="recents" icon={<FontAwesomeIcon  icon={faMap} style={{fontSize:'1.5rem'}}/>} style={{ flex: 1, textAlign: 'center',fontSize:'1.3rem' }}>
//           Map
//         </Menu.Item>
//         <Menu.Item key="favorites" icon={<FontAwesomeIcon icon={faChildReaching} style={{fontSize:'1.5rem'}}/>} style={{ flex: 1, textAlign: 'center',fontSize:'1.3rem'  }}>
//           Activity
//         </Menu.Item>
//         <Menu.Item key="archive" icon={<FontAwesomeIcon icon={faReceipt} style={{fontSize:'1.5rem'}}/>} style={{ flex: 1, textAlign: 'center',fontSize:'1.3rem'  }}>
//           Report
//         </Menu.Item>
//       </Menu>
//     </Footer>
//   );
// };

// export default FooterBar;
import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChildReaching, faMap, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const { Footer } = Layout;

const FooterBar = () => {
  const location = useLocation();  // Get current location
  const [selectedKey, setSelectedKey] = useState('recents');

  // Set the selectedKey based on the current path
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setSelectedKey('recents');
    } else if (location.pathname === '/activity') {
      setSelectedKey('favorites');
    } else if (location.pathname === '/report') {
      setSelectedKey('archive');
    }
  }, [location.pathname]); // Re-run the effect if the pathname changes

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const items = [
    {
      key: 'recents',
      icon: <FontAwesomeIcon icon={faMap} style={{ fontSize: '1.5rem' }} />,
      label: <Link to="/dashboard" style={{ fontSize: '1.2rem' }}>Map</Link>,
    },
    {
      key: 'favorites',
      icon: <FontAwesomeIcon icon={faChildReaching} style={{ fontSize: '1.5rem' }} />,
      label: <Link to="/activity" style={{ fontSize: '1.2rem' }}>Activity</Link>,
    },
    {
      key: 'archive',
      icon: <FontAwesomeIcon icon={faReceipt} style={{ fontSize: '1.5rem' }} />,
      label: <Link to="/report" style={{ fontSize: '1.2rem' }}>Report</Link>,
    },
  ];

  return (
    <Footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: 0, background: '#e9ecef', margin: '0 auto', width: '100%', maxWidth: '1200px' }}>
      <Menu
        mode="horizontal"
        items={items}  // Use the items prop
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0', background: 'white', border: 'none' }}
      />
    </Footer>
  );
};

export default FooterBar;
