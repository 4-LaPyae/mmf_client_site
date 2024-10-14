import { Table, Popconfirm, Space, Typography, Button, Badge, Tag } from "antd";
import { DeleteOutlined, SearchOutlined,EditOutlined } from "@ant-design/icons";
import { Input } from "antd";
import ResizableAntTable from "../../../common/resizable-ant-table";
import { useDeleteRoleMutation } from "../../../../features/feature_apis/roleApi";
import { useDispatch } from "react-redux";
import { setUpdateData } from "../../../../features/helperSlice";
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";

const RolePermissionList = ({ translate, setOpen, scrollAction ,data,showMessage}) => {
    
    const [deleteRole] = useDeleteRoleMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deleteHandler = (value) =>{
        const {id:deleteId} = value;
        // deleteRole(deleteId)
        // .unwrap()
        // .then((res)=>{
        //     if(!res.error){
        //         showMessage('success',res.message);
        //     }else{
        //         showMessage('error',res.message);
        //     }
        // })
    }
    const editHandler = async ( item) => {
        dispatch(setUpdateData(item));
        navigate('/admin/user-management/add-role-permission', {
            state: {
                data: item,
            },
        });
    };

    const columns = [
        {
            title: `No`,
            dataIndex: "role_id",
            key: "id",
            align: "center",
            width: 1,
            responsive: ["md"],
            render: (text, record, index) => index + 1,
        },
        {
            title: `Role Name`,
            dataIndex: "role_name",
            key: "role_name",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `Permission`,
            dataIndex: "permissions",
            key: "permissions",
            width: 1,
            responsive: ["md"],
            render: (_, {permissions}) => (
                <>
                {permissions.map((p) => {
                  return (
                    <Tag color='red' key={p.permission_name}>
                      {p.permission_name}
                    </Tag>
                  );
                })}
              </>
            )
            
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
                    <Popconfirm
						title='Are you sure to edit this role?'
						okText='Sure'
						cancelText='No'
						onConfirm={() => editHandler(record)}
					>
						<Button
							type='text'
							icon={
								<EditOutlined
									style={{ fontSize: '21px', color: 'green' }}
								/>
                            
							}
						/>
					</Popconfirm>
                    {/* <Popconfirm
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
                    </Popconfirm> */}
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

export default RolePermissionList;
