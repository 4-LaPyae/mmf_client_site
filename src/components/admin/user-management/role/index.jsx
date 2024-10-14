import React, { Fragment, useState } from "react";

import { message, Typography ,Flex} from "antd";
import RoleList from "./RoleList";
import AnimatedLayout from "../../../common/animated-layout";
import { useGetRolesQuery } from "../../../../features/feature_apis/roleApi";
import RoleDrawer from "./RoleDrawer";

const Roles = () => {
    const [open, setOpen] = useState(false);

    const { data, isLoading: roleLoading } = useGetRolesQuery();


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
                    Role Management
                    </Typography.Title>
                
                <hr />
                    <RoleDrawer
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
                    <RoleList 
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

export default Roles;