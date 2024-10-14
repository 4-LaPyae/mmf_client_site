import React, { Fragment, useState } from "react";
import { message, Typography ,Flex} from "antd";
import AnimatedLayout from "../../../common/animated-layout";
import { useGetPermissionQuery } from "../../../../features/feature_apis/permissionApi";
import PermissionList from "./PermissionList";
import PermissionDrawer from "./PermissionDrawer";

const Permissions = () => {
    const [open, setOpen] = useState(false);

    const { data, isLoading: roleLoading } = useGetPermissionQuery();

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
                    Permission Management
                    </Typography.Title> 
                <hr />
                    <PermissionDrawer
                    open={open}
                    setOpen={setOpen}
                    data={data}
                    showMessage={showMessage}
                    />
                </Flex>
                {

                }
                  {roleLoading ? (
                    "Loading..."
                ) : (
                    <PermissionList 
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
    );
};

export default Permissions;