import { Fragment, useEffect, useState } from "react";
import { Flex, message, Typography } from "antd";
import AnimatedLayout from "../../common/animated-layout";
import { useGetTownshipQuery } from "../../../features/feature_apis/townshipApi";
import TownshipList from "./TownshipList";
import TownshipDrawer from "./TownshipDrawer";

const Township = ()=>{
    const [open, setOpen] = useState(false);


    const { data,isSuccess, isLoading } = useGetTownshipQuery();

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
                    Township Management
                    </Typography.Title> 
                <hr />
                    <TownshipDrawer
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
                    <TownshipList 
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

export default Township;
