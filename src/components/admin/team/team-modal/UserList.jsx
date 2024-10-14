import { Checkbox } from "antd";
import CustomTable from "./CustomTable";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const UserList = ({ rowSelection, scrollAction ,data,showMessage}) => {
    return (
            <CustomTable
                rowSelection={rowSelection}
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

export default UserList;
