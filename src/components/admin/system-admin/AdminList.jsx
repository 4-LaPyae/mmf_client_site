import { Table, Popconfirm, Space, Typography, Button,Image } from "antd";
import { DeleteOutlined, SearchOutlined,EditOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import ResizableAntTable from "../../common/resizable-ant-table";
import { setUpdateData } from "../../../features/helperSlice";
import { useDeleteAdminMutation } from "../../../features/feature_apis/adminApi";
import { useState } from "react";

const AdminList = ({ translate, setOpen, scrollAction ,data,showMessage}) => {

    const dispatch = useDispatch();

    const [deleteAdmin] = useDeleteAdminMutation();
    const deleteHandler = (value) =>{
        const {id:deleteId} = value;
        deleteAdmin(deleteId)
        .unwrap()
        .then((res)=>{
            if(!res.error){
                showMessage('success',res.message);
            }else{
                showMessage('error',res.message);

            }
        })
    }
    const handleDrawerOpen = (e, item) => {
        e.preventDefault();
        setOpen(true);
        dispatch(setUpdateData(item));
    };
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
            title: `Name`,
            dataIndex: "name",
            key: "name",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `Email`,
            dataIndex: "email",
            key: "email",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `Phone`,
            dataIndex: "phone",
            key: "phone",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `Role`,
            dataIndex: "role_name",
            key: "role_name",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `Action`,
            dataIndex: "action",
            key: "actions",
            width: 1,
            responsive: ["md"],
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
                            onClick={(e) => handleDrawerOpen(e,record)}
							icon={
								<EditOutlined
									style={{ fontSize: '21px', color: 'green' }}
								/>
                            
							}
						/>
					{/* </Popconfirm> */}
                    <Popconfirm
                        title="Are you sure to delete this role?"
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
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
            <ResizableAntTable
                size="small"
                // pagination={{
                //     total: data?.data.total_group_count,
                //     onChange: (page, limit) => {
                //         setPage(page);
                //         setLimit(limit);
                //     },
                // }}
                style={{ marginTop: 40 }}
                data={data}
                columns={columns}
                bordered
            />
    );
};

export default AdminList;
