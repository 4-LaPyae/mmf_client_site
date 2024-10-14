import { Fragment, useEffect, useState } from "react";
import { Flex, message, Typography } from "antd";
import AnimatedLayout from "../../common/animated-layout";
import { useGetUsersQuery } from "../../../features/feature_apis/userApi";
import EmployeeDrawer from "./EmployeeDrawer";
import EmployeeList from "./EmployeeList";

const User = ()=>{
    const [open, setOpen] = useState(false);


    const { data,isSuccess, isLoading } = useGetUsersQuery();

    const scrollAction = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const [messageApi, contextHolder] = message.useMessage();
    const showMessage = (type,message) => {
        type == 'success' ?  messageApi.success(message) : messageApi.error(message);
      };
    return (
        <AnimatedLayout>
        <Fragment>
        {contextHolder}
        <Flex justify="space-between" align="center">
                    <Typography.Title
                        style={{ marginTop: 0, marginBottom: 40 }}
                        level={2}
                    >
                    Employee Management
                    </Typography.Title> 
                <hr />
                    <EmployeeDrawer
                    open={open}
                    setOpen={setOpen}
                    showMessage={showMessage}
                    />
                </Flex>
                {

                }
                  {isLoading ? (
                    "Loading..."
                ) : (
                    <EmployeeList 
                    setOpen={setOpen}
                    scrollAction={scrollAction}
                    data={data?.data.map(item => ({
                        key: item.id,
                        ...item
                      })) || []}                    
                    showMessage={showMessage}
                    />
                )}
        </Fragment>
        </AnimatedLayout>
    )
}

export default User;
