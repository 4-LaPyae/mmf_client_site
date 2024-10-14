import PropTypes from "prop-types";
import ResizableAntTable from "../../common/resizable-ant-table";

const MenuList = ({ data }) => {
    const columns = [
        {
            title: "Page Name",
            dataIndex: "label",
            key: "label",
            width: 1,
        },
        {
            title: "Page Directory",
            dataIndex: "path",
            key: "path",
            width: 1,
            responsive: ["md"],
        },
        {
            title: "Parent ID",
            dataIndex: "id",
            key: "id",
            width: 1,
            responsive: ["md"],
        },
        {
            title: "Child ID",
            dataIndex: "parent_id",
            key: "parent_id",
            width: 1,
            responsive: ["md"],
        },
        // {
        //     title: `Action`,
        //     dataIndex: "action",
        //     key: "actions",
        //     width: 1,
        //     responsive: ["md"],
        //     align: "center",
        //     render: (_, record) => (
        //         <Space size={"middle"}>
        //             {/* <Popconfirm
		// 				title='Are you sure to edit this menu?'
		// 				okText='Sure'
		// 				cancelText='No'
		// 				onConfirm={() => editHandler(record)}
		// 			> */}
		// 				<Button
		// 					type='text'
		// 					icon={
		// 						<EditOutlined
		// 							style={{ fontSize: '21px', color: 'green' }}
		// 						/>
		// 					}
		// 				/>
		// 			{/* </Popconfirm> */}
        //             {/* <Popconfirm
        //                 title="Are you sure to delete this menu?"
        //                 // onConfirm={() => deleteHandler(record)}
        //                 okText="Delete"
        //                 cancelText="Cancle"
        //             >
        //                 <Button
        //                     type="text"
        //                     icon={
        //                         <DeleteOutlined
        //                             style={{ fontSize: "21px", color: "red" }}
        //                         />
        //                     }
        //                 />
        //             </Popconfirm> */}
        //         </Space>
        //     ),
        // },
    ];

    return (
        <ResizableAntTable
            columns={columns}
            data={data}
            style={{ marginTop: 40 }}
        />
    );
};

MenuList.propTypes = {
    data: PropTypes.array.isRequired,
};

export default MenuList;
