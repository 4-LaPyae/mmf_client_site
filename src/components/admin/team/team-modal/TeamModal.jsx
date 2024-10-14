import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Table,
} from "antd";
import UserList from "./UserList";
import { useGetSupervisorQuery } from "../../../../features/feature_apis/adminApi";
import { useGetUsersQuery } from "../../../../features/feature_apis/userApi";
import {
    useCreateTeamMutation,
    useUpdateTeamMutation,
} from "../../../../features/feature_apis/teamApi";
import { useDispatch, useSelector } from "react-redux";
import { clearUpdateData } from "../../../../features/helperSlice";
import { useGetExitTeamMemberQuery } from "../../../../features/feature_apis/exitTeamMemberApi";

const TeamModal = ({
    isModalOpen,
    setIsModalOpen,
    scrollAction,
    showMessage,
}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [state, setState] = useState();
    const [exitTeamMember, setExitTeamMember] = useState([]);
    const dispatch = useDispatch();
    const { data: supervisorData } = useGetSupervisorQuery();
    const { data: userData } = useGetUsersQuery();
    const { data: exitTeamMembers } = useGetExitTeamMemberQuery();

    const [createTeam, { isLoading }] = useCreateTeamMutation();
    const [updateTeam, { isLoading: isUpdateLoading }] =
        useUpdateTeamMutation();
    const { update_data } = useSelector((state) => state.HelperSlice);

    const [form] = Form.useForm();

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record) => ({
            disabled: exitTeamMember?.includes(record.key), // Disable checkbox for row with key 1
        }),
    };
    const hasSelected = selectedRowKeys?.length > 0;

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        dispatch(clearUpdateData());
        form.resetFields();
        setSelectedRowKeys([]);
        // setExitTeamMember([])
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        const res = { user_ids: selectedRowKeys, ...values };
        try {
            if (update_data) {
                updateTeam({ id: update_data?.id, data: res })
                    .unwrap()
                    .then(async (result) => {
                        if (!result.error) {
                            handleCancel();
                            showMessage("success", result.message);
                        } else {
                            showMessage("error", result.message);
                        }
                    });
            } else {
                createTeam(res)
                    .unwrap()
                    .then(async (result) => {
                        if (!result.error) {
                            handleCancel();
                            showMessage("success", result.message);
                        } else {
                            showMessage("error", result.message);
                        }
                    });
            }
        } catch (error) {
            console.log("API request error", error);
        }
    };

    useEffect(() => {
        if (userData?.data) {
            const formattedData = userData?.data.map((user) => ({
                key: user.id, // Using `id` as `key`
                name: user.name,
                address: user.address,
            }));
            setState(formattedData);
        }
        setExitTeamMember(exitTeamMembers?.data);
        if (update_data) {
            // setExitTeamMember([])
            const { name, supervisor, members } = update_data;
            const checkMembers = members?.map((member) => member.id);
            const result = exitTeamMember.filter(
                (value) => !checkMembers.includes(value),
            );
            setExitTeamMember(result);
            setSelectedRowKeys(checkMembers);

            form.setFieldsValue({
                team_name: name,
                supervisor_id: supervisor?.id,
            });
        }
        // else{
        //     setExitTeamMember(exitTeamMembers?.data)
        // }
    }, [userData, update_data, exitTeamMembers]);

    return (
        <>
            <Modal
                width={800}
                title={update_data ? "Update Team" : "Create Team"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
            >
                <Form
                    style={{ marginTop: 10 }}
                    form={form}
                    wrapperCol={{
                        span: 20,
                    }}
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                            <Form.Item
                                label="Name"
                                name="team_name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter name!",
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter team name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} lg={24} xl={12}>
                            <Form.Item
                                label="Supervisor"
                                name="supervisor_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select supervisor!",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a supervisor"
                                    allowClear
                                >
                                    {supervisorData?.data.map((item) => (
                                        <Select.Option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <span style={{ padding: "5px" }}>
                        {hasSelected
                            ? `Selected ${selectedRowKeys?.length} users`
                            : null}
                    </span>
                    <UserList
                        rowSelection={rowSelection}
                        scrollAction={scrollAction}
                        data={state || []}
                        showMessage={showMessage}
                    />
                    {/* <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} /> */}

                    <Row style={{ marginTop: 20 }}>
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            sm={{ span: 4, offset: 10 }}
                        >
                            <Form.Item>
                                <Flex>
                                    <Button
                                        key="back"
                                        onClick={handleCancel}
                                        style={{ marginRight: 10 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        disabled={
                                            !hasSelected ||
                                            isLoading ||
                                            isUpdateLoading
                                        }
                                    >
                                        {update_data ? "Update" : "Save"}
                                    </Button>
                                </Flex>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
export default TeamModal;
