import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    Row,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect, useState } from "react";
import { clearUpdateData } from "../../../features/helperSlice";
import { usePostTypePersonMutation, useUpdateTypePersonMutation } from "../../../features/feature_apis/typepersonApi";

const initialState = {
    name:""
}
const TypePersonDrawer = ({ open, setOpen, showMessage }) => {

    const [state, setState] = useState(initialState);

    const [form] = Form.useForm();

    const { update_data } = useSelector((state) => state.HelperSlice);
    const [addRole, { isLoading }] = usePostTypePersonMutation();
    const [updateRole, { isLoading: isUpdateLoading }] = useUpdateTypePersonMutation();

    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            if (update_data) {
                const {id, ...rest } = state;
                updateRole({id,data:values})
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
                addRole(values)
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
            console.log("API request error", error);

        }

    }
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        if(update_data) dispatch(clearUpdateData())
        // setState(initialState);
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
                Create TypePerson
            </Button>
            <Drawer
                title={update_data ? "Update Type Peson" : "Create Type Person"}
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
                                label="Type Person"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter name!',

                                    },
                                ]}
                            >
                                <Input />
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

export default TypePersonDrawer;