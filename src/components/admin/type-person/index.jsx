import React, { Fragment, useState } from "react";

import { message, Typography ,Flex} from "antd";
import AnimatedLayout from "../../common/animated-layout";
import { useGetTypePersonQuery } from "../../../features/feature_apis/typepersonApi";
import TypePersonDrawer from "./TypePersonDrawer";
import TypePersonList from "./TypePersonList";

const TypePersons = () => {
    const [open, setOpen] = useState(false);

    const { data, isLoading: roleLoading } = useGetTypePersonQuery();


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
                    TypePerson Management
                    </Typography.Title>
                
                <hr />
                    <TypePersonDrawer
                    open={open}
                    setOpen={setOpen}
                    showMessage={showMessage}
                    />
                </Flex>
                {

                }
                  {roleLoading ? (
                    "Loading..."
                ) : (
                    <TypePersonList 
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

export default TypePersons;