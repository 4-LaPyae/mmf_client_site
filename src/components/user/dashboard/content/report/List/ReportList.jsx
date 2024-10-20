import { Table, Popconfirm, Space, Typography, Button, Image } from "antd";
import { DeleteOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import ResizableAntTable from "../../../../../common/resizable-ant-table";
import dayjs from 'dayjs';
const ReportList = ({ scrollAction, data,isLoading ,setPage,setOpenModel,setReprtData}) => {

    const dispatch = useDispatch();
    // const deleteHandler = (value) =>{
    //     const {id:deleteId} = value;
    //     deleteTypePerson(deleteId)
    //     .unwrap()
    //     .then((res)=>{
    //         if(!res.error){
    //             showMessage('success',res.message);
    //         }else{
    //             showMessage('error',res.message);

    //         }
    //     })
    // }
    const handleDrawerOpen = (e, item) => {
        e.preventDefault();
    };
    const teamDetailHandler = (e,item)=>{
        // navigate(`${item.name.replace(/\s/g, "")}`, {
        //     state: {
        //         data: item,
        //     },
        // });
        setOpenModel(true);
        setReprtData(item);

    }
    const columns = [
        {
            title: `Action`,
            dataIndex: "action",
            key: "actions",
            // width: 1,
            // responsive: ["md"],
            align: "center",
            render: (_, record) => (
                <Space size={"middle"}>
                    {/* <Popconfirm
						title='Are you sure to edit this permission?'
						okText='Sure'
						cancelText='No'
						onConfirm={() => editHandler(record)}
					> */}
                    <Button
              type='text'
              onClick={(e) => teamDetailHandler(e, record)}
              icon={
                <EyeOutlined
                  style={{ fontSize: '21px', color: 'blue' }}
                />
    
              }
            />
                    {/* </Popconfirm> */}
                    {/* <Popconfirm
                        title="Are you sure to delete this type person?"
                        onConfirm={() => deleteHandler(record)}
                        okText="Delete"
                        cancelText="Cancle"
                    >
                        <Button
                            type="text"
                            icon={
                                <DeleteOutlined
                                    style={{ fontSize: "21px", color: "red" }}
                                />
                            }
                        />
                    </Popconfirm> */}
                </Space>
            ),
        },
        {
            title: `No`,
            dataIndex: "id",
            key: "id",
            align: "center",
            // width: 1,
            // responsive: ["sm"],
            render: (text, record, index) => index + 1,
        },
        {
            title: `User Name`,
            dataIndex: "user",
            key: "user",
            // width: 1,
            // responsive: ["sm"],
        },
        // {
        //     title: 'Reporting',
        //     dataIndex: 'reporting',
        //     key: 'reporting',
        //   },
        {
            title: `Image`,
            dataIndex: "photo",
            key: "photo",
            align: "center",
            // width: 1,
            // responsive: ["sm"],
            render: (_, { photo }) => (
                <>
                    <Image
                        width={50}
                        height={50}
                        src={photo}
                        fallback={'/src/assets/images/no-photo/nophoto.jpg'}
                    />
                </>
            )

        },
        // {
        //     title: 'Shooting Date & Time',
        //     dataIndex: 'shooting_date_time',
        //     key: 'shooting_date_time',
        //     render: (text) => text ? dayjs(text).format('MM/DD/YYYY h:mm A') : 'N/A',
        // },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => dayjs(text).format('MM/DD/YYYY'),
        },
        // {
        //     title: 'From',
        //     dataIndex: 'from',
        //     key: 'from',
        // },
        // {
        //     title: 'To',
        //     dataIndex: 'to',
        //     key: 'to',
        // },
        {
            title: 'Postcode',
            dataIndex: 'postcode',
            key: 'postcode',
        },
        {
            title: 'Type of Person',
            dataIndex: 'typeperson',
            key: 'typeperson',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => dayjs(text).format('MM/DD/YYYY h:mm A'),
        }
    ];
    const handleTableChange = (pagination) => {
        setPage(pagination);
        //console.log(pagination);
        //setCurrentPage(pagination.current);
      };

    return (
        <ResizableAntTable
            size="small"
            // pagination={{
            //     total: data?.total,
            //     onChange: (page, limit) => {
            //         setPage(page);
            //         setLimit(limit);
            //     },
            // }}
            pagination={{
                current: data?.page || 1,
                pageSize: data?.rowPerPages || 10,
                total: data?.total || 0,
                onChange: handleTableChange,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} records`,  // Show total records
              }}
            style={{ marginTop: 40 }}
            data={data?.data?.map(item => ({
                key: item.id,
                ...item
              })) || []}
            columns={columns}
            bordered
        />
    );
};

export default ReportList;