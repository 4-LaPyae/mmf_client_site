import { Table, Popconfirm, Space, Typography, Button } from "antd";
import { DeleteOutlined, SearchOutlined,EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useDeleteTownshipMutation } from "../../../features/feature_apis/townshipApi";
import ResizableAntTable from "../../common/resizable-ant-table";
import { setUpdateData } from "../../../features/helperSlice";

const TownshipList = ({ translate, setOpen, scrollAction ,data,showMessage}) => {
    
    const [deleteTownship] = useDeleteTownshipMutation();
    const dispatch = useDispatch();
    const deleteHandler = (value) =>{
        const {id:deleteId} = value;
        deleteTownship(deleteId)
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
        },
        {
            title: `Name`,
            dataIndex: "name",
            key: "name",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `Village Track`,
            dataIndex: "village_track",
            key: "village_track",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `Village`,
            dataIndex: "village",
            key: "village",
            width: 1,
            responsive: ["md"],
        },
        {
            title: `Post Code`,
            dataIndex: "postcode",
            key: "postcode",
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
                        title="Are you sure to delete this township?"
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
                //     total: data?.total,
                //     onChange: (page, limit) => {
                //         // setPage(page);
                //         // setLimit(limit);
                //     },
                // }}
                style={{ marginTop: 40 }}
                data={data}
                columns={columns}
                bordered
            />
    );
};

export default TownshipList;
