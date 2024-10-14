import { Badge, Button, Checkbox, Popconfirm, Space } from "antd";
import { DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import ResizableAntTable from "../../common/resizable-ant-table";
import { useDispatch } from "react-redux";
import { useDeleteTeamMutation } from "../../../features/feature_apis/teamApi";
import { setUpdateData } from "../../../features/helperSlice";



const TeamList = ({  setIsModalOpen,showMessage, data }) => {

  const dispatch = useDispatch();

    const [deleteTeam] = useDeleteTeamMutation();
    const deleteHandler = (value) =>{
        const {id:deleteId} = value;
        deleteTeam(deleteId)
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
        // console.log('item',item);
        e.preventDefault();
        setIsModalOpen(true);
        dispatch(setUpdateData(item));
    };

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: "name",
        align: "center",
        width: 1,
        responsive: ["md"],
      },
      {
        title: 'Supervisor',
        dataIndex: 'supervisor',
        key: "supervisor",
        align: "center",
        width: 1,
        responsive: ["md"],
        render: (_, { supervisor }) => supervisor?.name,
      },
      {
        title: 'Total Members',
        dataIndex: 'members',
        key: "members",
        align: "center",
        width: 1,
        responsive: ["md"],
        render: (_, { members }) => (
          <Badge count={members?.length} color="#faad14"/>
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
            {/* <Popconfirm
        title='Are you sure to edit this permission?'
        okText='Sure'
        cancelText='No'
        onConfirm={() => editHandler(record)}
      > */}
      {/* <Button
              type='text'
              onClick={(e) => handleDrawerOpen(e, record)}
              icon={
                <EyeOutlined
                  style={{ fontSize: '21px', color: 'blue' }}
                />
    
              }
            /> */}
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
      style={{ marginTop: 10 }}
      data={data}
      columns={columns}
      bordered
    />
  );
};

export default TeamList;
