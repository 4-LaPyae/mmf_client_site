import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    Row,
    Select
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { clearUpdateData } from "../../../features/helperSlice";
import { useGetRolesQuery } from "../../../features/feature_apis/roleApi";
import { useCreateAdminMutation, useUpdateAdminMutation } from "../../../features/feature_apis/adminApi";

const initialState = {
    username: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role_id: ""
}
const AdminDrawer = ({ open, setOpen, showMessage }) => {

    const [state, setState] = useState(initialState);
    const [pswItem,setPswItem] = useState("");
    const [form] = Form.useForm();

    const { data:rolesData } = useGetRolesQuery();
    const [postAdmin,{isLoading}] = useCreateAdminMutation();
    const [updateAdmin,{isLoading:isUpdateLoading}]  = useUpdateAdminMutation();
    const { update_data } = useSelector((state) => state.HelperSlice);

    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            if(update_data){
                const {id, ...rest } = state;
                const res = {...values,address:state.address};
                updateAdmin({id,data:res})
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
            }else{
                postAdmin(values)
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
            form.setFieldsValue({...update_data,password:"******"});
        }
    }, [update_data, form]);
    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Create Admin
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
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter email!",
                                    },
                                ]}
                            >
                                <Input />
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
                                <Input />
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
                                <Input disabled={update_data ? true : false}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                            <Form.Item
                                label="Role"
                                name="role_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select role!",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Role"
                                    allowClear
                                >
                                    {rolesData?.data.map((item) => (
                                        <Select.Option key={item.id} value={item.id}>
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

export default AdminDrawer;