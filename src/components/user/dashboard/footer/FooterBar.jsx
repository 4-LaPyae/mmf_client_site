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

import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChildReaching, faMap, faReceipt } from '@fortawesome/free-solid-svg-icons';

const { Footer } = Layout;

const FooterBar = () => {
  const [selectedKey, setSelectedKey] = useState('recents');

  const handleButtonClick = (key) => {
    setSelectedKey(key);
  };

  return (
    <Footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: 0, background: '#001529' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }}>
        <Button
          type={selectedKey === 'recents' ? 'primary' : 'default'}
          icon={<FontAwesomeIcon icon={faMap} style={{ fontSize: '1.5rem' }} />}
          style={{ flex: 1, textAlign: 'center', fontSize: '1.3rem', margin: '0 0.5rem' }}
          onClick={() => handleButtonClick('recents')}
        >
          Map
        </Button>
        <Button
          type={selectedKey === 'favorites' ? 'primary' : 'default'}
          icon={<FontAwesomeIcon icon={faChildReaching} style={{ fontSize: '1.5rem' }} />}
          style={{ flex: 1, textAlign: 'center', fontSize: '1.3rem', margin: '0 0.5rem' }}
          onClick={() => handleButtonClick('favorites')}
        >
          Activity
        </Button>
        <Button
          type={selectedKey === 'archive' ? 'primary' : 'default'}
          icon={<FontAwesomeIcon icon={faReceipt} style={{ fontSize: '1.5rem' }} />}
          style={{ flex: 1, textAlign: 'center', fontSize: '1.3rem', margin: '0 0.5rem' }}
          onClick={() => handleButtonClick('archive')}
        >
          Report
        </Button>
      </div>
    </Footer>
  );
};

export default FooterBar;

