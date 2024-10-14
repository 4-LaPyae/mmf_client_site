import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    Row,
    Select,
    message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import clipboard from "clipboard-copy";

import { usePostMenuMutation } from "../../../features/feature_apis/menuApi";

const MenuDrawer  = ({open,setOpen,data,showMessage}) =>{
     // Create a reference to the form using the useForm hook
     const [form] = Form.useForm();

     const [addMenu,{ isLoading }] = usePostMenuMutation();

       // Handle form submission
    const onFinish = async (values) => {
        const { path } = values;
        const body = {
            ...values,
            path: path.trim() === "" ? null : values.path,
            icon: values.icon === undefined ? null : values.icon,
            parent_id: values.parent_id === undefined ? null : values.parent_id
        };
        // console.log(body);return;
        try {
            addMenu(body)
                .unwrap()
                .then(async (result) => {
                    if (!result.data.error) {
                        // Define terminal commands for localization update and component creation
                        const localeCommand = `npm run update-locales -- --args=${path}`;
                        const componentCommand = `npm run create-component -- --args=${path}`;
                        const combinedCommands = `${localeCommand}\n${componentCommand}`;

                        setOpen(false);
                        // messageApi.success(result.message);
                        showMessage('success',result.message);

                        // Copy commands to clipboard and display a success message
                        try {
                            await clipboard([combinedCommands]);
                        } catch (error) {
                            message.error("Copying to clipboard failed.");
                            console.error("Copy to clipboard failed:", error);
                        }

                        // Reset the form fields
                        form.resetFields();
                    } else {
                        showMessage('error',result.data);
                    }
                })


        } catch (error) {
            console.log("API request error", error);
        }
    };

    // Handle form validation failure
    const onFinishFailed = (errorInfo) => {
        console.log("Form validation failed:", errorInfo);
    };
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        form.resetFields();
    };

    return (
        <>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                        Create Menu
                    </Button>
         <Drawer
                    title="Create a new menu"
                    width={620}
                    onClose={onClose}
                    open={open}
                    styles={{
                        body: {
                            paddingBottom: 80,
                        },
                    }}
                >
                    <Form
                        style={{ marginTop: 30 }}
                        form={form}
                        wrapperCol={{
                            span: 20,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                        autoComplete="off"
                    >
                        <Row gutter={16}>
                            <Col xs={24} sm={24} lg={24} xl={12}>
                                <Form.Item
                                    label="Label"
                                    name="label"
                                    rules={[
                                        {
                                            required: true,
                                            message:'Please enter label!' ,
                                          
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} lg={24} xl={12}>
                                <Form.Item
                                    label="Path"
                                    name="path"
                                    rules={[
                                        {
                                            required: true,
                                            message:"Please enter label!" ,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} lg={24} xl={12}>
                                <Form.Item
                                    label="Icon"
                                    name="icon"
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message:"please enter icon!" ,
                                    //     },
                                    // ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} lg={24} xl={12}>
                                <Form.Item label="Parent" name="parent_id">
                                    <Select allowClear>
                                        {
                                            data?.data.map((item, index) => (
                                                <Select.Option
                                                    key={index}
                                                    value={item.id}
                                                >
                                                    {item.label}
                                                </Select.Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <Col
                                xs={{ span: 24, offset: 0 }}
                                sm={{ span: 4, offset: 10 }}
                            >
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        disabled={isLoading}
                                    >
                                        Save
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
                </>
    )
}

export default MenuDrawer;