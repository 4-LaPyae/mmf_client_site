import { Fragment, useEffect, useState } from "react";
import AnimatedLayout from "../../common/animated-layout";
import { Flex, message, Typography } from "antd";
import { useGetAdminsQuery } from "../../../features/feature_apis/adminApi";
import AdminList from "./AdminList";
import AdminDrawer from "./AdminDrawer";

const SystemAdmin = ()=>{
    const [open, setOpen] = useState(false);


    const { data,isSuccess, isLoading } = useGetAdminsQuery();

    const scrollAction = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const [messageApi, contextHolder] = message.useMessage();
    const showMessage = (type,message) => {
        type == 'success' ?  messageApi.success(message) : messageApi.error(message);
      };
    // console.log('data',data)
    return (
        <AnimatedLayout>
        <Fragment>
        {contextHolder}
        <Flex justify="space-between" align="center">
                    <Typography.Title
                        style={{ marginTop: 0, marginBottom: 40 }}
                        level={2}
                    >
                    Admin Management
                    </Typography.Title> 
                    {/* <PermissionForm update={updateData} setUpdate={setUpdateData} /> */}
                <hr />
                    <AdminDrawer
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
                    <AdminList 
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

export default SystemAdmin;