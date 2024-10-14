import { Fragment, useState } from "react";
import AnimatedLayout from "../../../common/animated-layout";
import { Flex, message, Typography } from "antd";
import RolePermissionList from "./RolePermissionList";
import { useGetAllRolePermissionsQuery } from "../../../../features/feature_apis/allRolePermissionApi";

const RolePermission = () => {
    const [open, setOpen] = useState(false);

    const { data, isSuccess, isLoading } = useGetAllRolePermissionsQuery();

    const scrollAction = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
    const [messageApi, contextHolder] = message.useMessage();
    const showMessage = (type, message) => {
        type == 'success' ? messageApi.success(message) : messageApi.error(message);
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
                        Role and Permission List
                    </Typography.Title>

                </Flex>

                {isLoading ? (
                    "Loading..."
                ) : (
                    <RolePermissionList
                        setOpen={setOpen}
                        scrollAction={scrollAction}
                        data={data?.data.map(item => ({
                            key: item.role_id,
                            ...item
                          })) || []}
                        showMessage={showMessage}
                    />
                )}

            </Fragment>
        </AnimatedLayout>
    )
}

export default RolePermission;