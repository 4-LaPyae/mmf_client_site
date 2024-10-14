import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    Row,
    Select
} from "antd";
const { TextArea } = Input;

import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { clearUpdateData } from "../../../features/helperSlice";
import { usePostTownshipMutation, useUpdateTownshipMutation } from "../../../features/feature_apis/townshipApi";

const initialState = {
    name: "",
    village_track: "",
    village: "",
    postcode: "",
}
const TownshipDrawer = ({ open, setOpen, showMessage }) => {

    const [state, setState] = useState(initialState);

    const [form] = Form.useForm();

    const [postTownship, { isLoading }] = usePostTownshipMutation();
    const [updateTownship, { isLoading: isUpdateLoading }] = useUpdateTownshipMutation();
    const { update_data } = useSelector((state) => state.HelperSlice);

    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            if (update_data) {
                const { id } = state;
                updateTownship({ id, data: values })
                    .unwrap()
                    .then(async (result) => {
                        if (!result.error) {
                            setOpen(false);
                            dispatch(clearUpdateData());
                            form.resetFields();
                            showMessage('success', result.message);
                        } else {
                            showMessage('error', result.message);
                        }
                    })
            } else {
                postTownship(values)
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
        // setState(initialState);
        setOpen(false);
        form.resetFields();
        if (update_data) dispatch(clearUpdateData())
    };

    useEffect(() => {
        if (update_data) {
            setState(update_data);
            form.setFieldsValue({ ...update_data, password: "******" });
        }
    }, [update_data, form]);
    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Create Township
            </Button>
            <Drawer
                title={update_data ? "Update Township" : "Create Township"}
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
                    // onFinishFailed={onFinishFailed}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                            <Form.Item
                                label="Name"
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
                        <Col xs={24} sm={24} lg={24} xl={12}>
                            <Form.Item
                                label="Village Track"
                                name="village_track"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Village Track!',

                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                    
                        <Form.Item
                                label="Village"
                                name="village"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Village Village!',

                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                        <Form.Item
                                label="Post Code"
                                name="postcode"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter post code!',
                                    },
                                    // {
                                    //     len: 6,
                                    //     message: 'Number must be exactly 6 digits.',
                                    // },
                                ]}
                            >
                                <Input
                                />
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

export default TownshipDrawer;