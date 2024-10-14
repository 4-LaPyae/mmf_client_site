import React, { Fragment, useState } from 'react';
import { Button, Flex, Input, message, Table, Typography } from 'antd';
import AnimatedLayout from '../../common/animated-layout';
import TeamModal from './team-modal/TeamModal';
import { useGetTeamQuery } from '../../../features/feature_apis/teamApi';
import TeamList from './TeamList';

const Team = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const {data,isLoading} = useGetTeamQuery();
  const scrollAction = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};
  const [messageApi, contextHolder] = message.useMessage();
  const showMessage = (type,message) => {
      type == 'success' ?  messageApi.success(message) : messageApi.error(message);
    };

  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <AnimatedLayout>
    <Fragment>
      {contextHolder}
    <Flex gap="middle" vertical>
      <Flex style={{display:'flex',justifyContent:'space-between'}}>
        <div>
        <Typography.Title
                        style={{ marginTop: 0, marginBottom: 40 }}
                        level={2}
                    >
                    Team Management
                    </Typography.Title> 
        </div>
        <div>
        <Button type="primary" onClick={showModal} >
          Create Team
        </Button>
        </div>
        <TeamModal 
                    
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    scrollAction={scrollAction}
                    showMessage={showMessage}/>
      </Flex>
    </Flex>
    {
      isLoading ? ( "Loading...") :(
        <TeamList
        setIsModalOpen={setIsModalOpen}
        showMessage={showMessage}
        data={data?.data.map(item => ({
          key: item.id,
          ...item
        })) || []} 
        />
      )
    }
    </Fragment>
    </AnimatedLayout>

  );
};
export default Team;

