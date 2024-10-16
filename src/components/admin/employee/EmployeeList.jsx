import { Table, Popconfirm, Space, Typography, Button, Tag, Switch, Tooltip, Image } from "antd";
import { DeleteOutlined, StopOutlined, SyncOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import ResizableAntTable from "../../common/resizable-ant-table";
import { setUpdateData } from "../../../features/helperSlice";
import { useActiveUserMutation, useDeleteUserMutation, useInActiveUserMutation } from "../../../features/feature_apis/userApi";
import { useState } from "react";

const EmployeeList = ({ translate, setOpen, scrollAction, data, showMessage }) => {

    const [suspenseStatus, setSuspenseStatus] = useState()
    const dispatch = useDispatch();

    const [deleteUser] = useDeleteUserMutation();
    const [inActiveUser, { isLoading: inActiveLoading }] = useInActiveUserMutation();
    const [activeUser, { isLoading: activeLoading }] = useActiveUserMutation();
    const handleDrawerOpen = (e, item) => {
        e.preventDefault();
        setOpen(true);
        dispatch(setUpdateData(item));
    };
    const suspenseSwitchHandler = (record) => {
        const { id,status } = record;
        if (id) {
            if(status == 'active'){
                inActiveUser(id)
                .unwrap()
                .then((res) => {
                    if (!res.error) {
                        showMessage('success', res.message);
                    } else {
                        showMessage('error', res.message);

                    }
                })
            }else{
                activeUser(id)
                .unwrap()
                .then((res) => {
                    if (!res.error) {
                        showMessage('success', res.message);
                    } else {
                        showMessage('error', res.message);

                    }
                })
            }
           
        }

    }
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
            title: `Login ID`,
            dataIndex: "login_id",
            key: "login_id",
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
            title: `Address`,
            dataIndex: "address",
            key: "address",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `Status`,
            dataIndex: "status",
            key: "status",
            width: 1,
            responsive: ["md"],
            render: (_, { status }) => (
                <Tag color={status == 'active' ? 'green' : "red"} key={status}>
                    {status}
                </Tag>
            )
        },
        {
            title: `Suspense`,
            dataIndex: "action",
            key: "actions",
            width: 1,
            responsive: ["md"],
            align: "center",
            render: (_, record) => (
                <Space size={"middle"}>
                    <Switch
                        onChange={() => suspenseSwitchHandler(record)}
                        checked={record.status == 'active' ? true : false}
                        disabled={inActiveLoading || activeLoading}
                    />
                </Space>
            ),
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
                        onClick={(e) => handleDrawerOpen(e, record)}
                        icon={
                            <EditOutlined
                                style={{ fontSize: '21px', color: 'green' }}
                            />

                        }
                    />
                    {/* </Popconfirm> */}
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

export default EmployeeList;
