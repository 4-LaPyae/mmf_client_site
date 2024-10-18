import React, { Fragment } from 'react';
import { Flex, Space, Table, Tag, Typography ,Image} from 'antd';
import AnimatedLayout from '../../../common/animated-layout';
const columns = [
    {
        title: `No`,
        dataIndex: "id",
        key: "id",
        align: "center",
        width: 1,
        responsive: ["md"],
        render: (text, record, index) => index + 1,
    },
    {
        title: `Image`,
        dataIndex: "photo",
        key: "photo",
        align: "center",
        width: 1,
        responsive: ["md"],
        render: (_, { photo }) => (
            <>
                <Image
                    width={100}
                    height={100}
                    src={photo}
                    fallback={'/src/assets/images/no-photo/nophoto.jpg'}
                />
            </>
        )

    },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
  },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
];
const CardTwo = ({data}) =>{

    return (
        <AnimatedLayout>
        <Fragment>
             <Flex justify="space-between" align="center">
                    <Typography.Title
                        style={{ marginTop: 0, marginBottom: 40 }}
                        level={2}
                    >
                    Team Members
                    </Typography.Title> 
        </Flex>
            <Table columns={columns} dataSource={data?.members} />
        </Fragment>
        </AnimatedLayout>
    )
} ;
export default CardTwo;