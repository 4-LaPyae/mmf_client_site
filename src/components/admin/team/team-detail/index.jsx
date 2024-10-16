import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Button, theme } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

// Custom panel label with 3 action buttons
const PanelLabel = ({ title, onAction1, onAction2, onAction3 }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span>{title}</span>
    <div>
      <Button type="primary" size="small" onClick={onAction1} style={{ marginRight: 8 }}>
        Action 1
      </Button>
      <Button type="default" size="small" onClick={onAction2} style={{ marginRight: 8 }}>
        Action 2
      </Button>
      <Button type="danger" size="small" onClick={onAction3}>
        Action 3
      </Button>
    </div>
  </div>
);

const getItems = (panelStyle) => [
  {
    key: '1',
    label: (
      <PanelLabel
        title="This is panel header 1"
        onAction1={() => alert('Action 1 clicked')}
        onAction2={() => alert('Action 2 clicked')}
        onAction3={() => alert('Action 3 clicked')}
      />
    ),
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '2',
    label: (
      <PanelLabel
        title="This is panel header 2"
        onAction1={() => alert('Action 1 clicked')}
        onAction2={() => alert('Action 2 clicked')}
        onAction3={() => alert('Action 3 clicked')}
      />
    ),
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '3',
    label: (
      <PanelLabel
        title="This is panel header 3"
        onAction1={() => alert('Action 1 clicked')}
        onAction2={() => alert('Action 2 clicked')}
        onAction3={() => alert('Action 3 clicked')}
      />
    ),
    children: <p>{text}</p>,
    style: panelStyle,
  },
];

const Team = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <Collapse
      bordered={false}
      //defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{
        background: token.colorBgContainer,
      }}
      items={getItems(panelStyle)}
    />
  );
};

export default Team;
