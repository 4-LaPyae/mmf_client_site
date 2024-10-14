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
import { useGetRolesQuery } from "../../../features/feature_apis/roleApi";
import { useCreateAdminMutation, useUpdateAdminMutation } from "../../../features/feature_apis/adminApi";
import { useCreteUserMutation, useUpdateUserMutation } from "../../../features/feature_apis/userApi";

const initialState = {
    username: "",
    name: "",
    login_id: "",
    phone: "",
    address: "",
    password: "",
}
const EmployeeDrawer = ({ open, setOpen, showMessage }) => {

    const [state, setState] = useState(initialState);
    const [pswItem, setPswItem] = useState("");
    const [loginId, setLoginId] = useState('');
    const [phoneNo,setPhoneNo] = useState('');

    const [form] = Form.useForm();

    const [postUser, { isLoading }] = useCreteUserMutation();
    const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
    const { update_data } = useSelector((state) => state.HelperSlice);

    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            if (update_data) {
                const { id, ...rest } = state;
                const res = { ...values, address: state.address };
                updateUser({ id, data: res })
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
                postUser(values)
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
            showMessage('error', 'Something went wrong!');
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


    const handleLoginIdChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        if(numericValue){
            // console.log(numericValue)
        }else{
            setLoginId();
        }
        if (numericValue.length <= 6) {
            setLoginId(numericValue);
        }
    };

    const handlePhoneChange = (e) =>{
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        if (numericValue.length <= 11) {
            setPhoneNo(numericValue);
        } 
    }

    useEffect(() => {
        if (update_data) {
            setState(update_data);
            form.setFieldsValue({ ...update_data, password: "******" });
        }
    }, [update_data, form]);
    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Create Employee
            </Button>
            <Drawer
                title={update_data ? "Update Employee" : "Create Employee"}
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
                                label="User Name"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter username!',

                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                            {/* <Form.Item
                                label="Login ID"
                                name="login_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter Login ID!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item> */}
                            <Form.Item
                                label="Login ID"
                                name="login_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input a six-digit number!',
                                    },
                                    // {
                                    //     len: 6,
                                    //     message: 'Number must be exactly 6 digits.',
                                    // },
                                ]}
                            >
                                <Input
                                    value={loginId}
                                    onChange={handleLoginIdChange}
                                    maxLength={6}
                                    placeholder="Enter a 6-digit number"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter phone!",
                                    },
                                ]}
                            >
                                <Input 
                                value={phoneNo}
                                onChange={handlePhoneChange}
                                maxLength={11}
                                placeholder="09*********"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter password!",
                                    },
                                ]}
                            >
                                <Input disabled={update_data ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                    <Col span={24}>
                    <Form.Item label="Address" name="address">
                                <TextArea rows={4} />
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

export default EmployeeDrawer;