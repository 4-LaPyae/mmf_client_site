import { Fragment, useEffect, useState } from "react";
import {
    Form,
    Select,
    message,
    Typography,
    Flex
} from "antd";
import { useTranslation } from "react-i18next";
import MenuList from "./menu-list";
import AnimatedLayout from "../../common/animated-layout";
import { useGetMenusQuery, usePostMenuMutation } from "../../../features/feature_apis/menuApi";
import MenuDrawer from "./MenuDrawer";
const { Option } = Select;


const MenuManagement = () => {

    const [open, setOpen] = useState(false);

    // Inform to run command for creating menu files.
    const loopBannerText =
        "After successfully saving the menu data, NPM commands are automatically copied. You must run these commands in the project repository using the terminal.";

    // Use a custom hook to fetch data and manage loading state
    const { data,isSuccess, isLoading: menuLoading } = useGetMenusQuery();


    // Initialize translation functions for localization
    const { t: s } = useTranslation("sidebar");

   

    // Create a reference to the message API
    const [messageApi, contextHolder] = message.useMessage();

    const showMessage = (type,message) => {
        type == 'success' ?  messageApi.success(message) : messageApi.error(message);
      };

    

    return (
        <AnimatedLayout>
            <Fragment>
                {contextHolder}
                {/* <LoopBanner content={loopBannerText} type="info" /> */}
                <Flex justify="space-between" align="center">
                    <Typography.Title level={2}>
                        {s("menu-management")}
                    </Typography.Title>
                    {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                        Create Menu
                    </Button> */}
                    {
                        isSuccess && <MenuDrawer  
                        open={open}
                        setOpen={setOpen}
                        data={data}
                        showMessage={showMessage}
                        />
                    }
                    
                </Flex>
                {menuLoading ? (
                    "Loading..."
                ) : (
                    <MenuList data={data?.data || []} />
                )}
            </Fragment>
        </AnimatedLayout>
    );
};

export default MenuManagement;
