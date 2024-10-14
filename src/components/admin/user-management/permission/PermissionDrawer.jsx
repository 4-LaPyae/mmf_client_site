import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    Row,
    Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearUpdateData } from "../../../../features/helperSlice";
import { useCallback, useEffect, useState } from "react";
import { usePostPermissionMutation, useUpdatePermissionMutation } from "../../../../features/feature_apis/permissionApi";

const initialState = {
    name:"",
    group_name:""
}
const permissionGroups = [
    {
        key: 1,
        name: "Team",
    },
    {
        key: 2,
        name: "Employee",
    },
    {
        key: 3,
        name: "Twonship",
    },
    {
        key: 4,
        name: "Type Person",
    },
];
const PermissionDrawer = ({ open, setOpen, data, showMessage }) => {

    const [state, setState] = useState(initialState);

    const [form] = Form.useForm();

    const { update_data } = useSelector((state) => state.HelperSlice);
    const [addPermission, { isLoading }] = usePostPermissionMutation();
    const [updatePermission, { isLoading: isUpdateLoading }] = useUpdatePermissionMutation();

    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            if (update_data) {
                const {id, ...rest } = state;
                updatePermission({id,data:values})
                    .unwrap()
                    .then(async (result) => {
                        if (!result.error) {
                            dispatch(clearUpdateData());
                            setOpen(false);
                            form.resetFields();
                            showMessage('success', result.message);
                        } else {
                            showMessage('error', result.message);
                        }
                    })
            } else {
                addPermission(values)
                .unwrap()
                .then(async (result) => {
                    if (!result.error) {
                        setOpen(false);
                        form.resetFields();
                        showMessage('success', result.message);
                    } else {
                        showMessage('error', result.message);
                    }
                })
            }
            
        } catch (error) {
            showMessage('error', "Something went wrong!");
        }

    }
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        if(update_data) dispatch(clearUpdateData())
        setOpen(false);
        form.resetFields();
    };

    useEffect(() => {
        if (update_data) {
            setState(update_data);
            form.setFieldsValue(update_data);
        }
    }, [update_data, form]);
    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Create Permission
            </Button>
            <Drawer
                title={update_data ? "Update" : "Create"}
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
                    // initialValues={state}
                    form={form}
                    // wrapperCol={{
                    //     span: 20,
                    // }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Permission"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter permission!',

                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            {/* <Input value={state.name}/> */}
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Group Name"
                                name="group_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Group Name!',

                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Gorup Name"
                                name="group_name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please select permission group!",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a permission group"
                                    allowClear
                                >
                                    {permissionGroups.map((item) => (
                                        <Select.Option
                                            key={item.key}
                                            value={item.name}
                                        >
                                            {item.name}
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
                                    disabled={isLoading || isUpdateLoading}
                                >
                                    {update_data ? "Update" : "Create"}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default PermissionDrawer;