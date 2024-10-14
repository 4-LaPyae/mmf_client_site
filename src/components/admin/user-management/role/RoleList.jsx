import { Table, Popconfirm, Space, Typography, Button } from "antd";
import { DeleteOutlined, SearchOutlined,EditOutlined } from "@ant-design/icons";
import ResizableAntTable from "../../../common/resizable-ant-table";
import { useDeleteRoleMutation } from "../../../../features/feature_apis/roleApi";
import { useDispatch } from "react-redux";
import { setUpdateData } from "../../../../features/helperSlice";

const RoleList = ({ translate, setOpen, scrollAction ,data,showMessage}) => {
    
    const [deleteRole] = useDeleteRoleMutation();
    const dispatch = useDispatch();
    const deleteHandler = (value) =>{
        const {id:deleteId} = value;
        deleteRole(deleteId)
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
            title: `Name`,
            dataIndex: "name",
            key: "name",
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
                pagination={{
                    total: data?.total,
                    onChange: (page, limit) => {
                        // setPage(page);
                        // setLimit(limit);
                    },
                }}
                style={{ marginTop: 40 }}
                data={data}
                columns={columns}
                bordered
            />
    );
};

export default RoleList;
