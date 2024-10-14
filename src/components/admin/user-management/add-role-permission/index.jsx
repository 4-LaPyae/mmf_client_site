import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Tree, Checkbox, Select, Typography, Flex, Form, Button, TreeSelect, message } from 'antd';
import { useGetGorupPermissionsQuery } from '../../../../features/feature_apis/roleAndPermissionApi';
import { useGetRolesQuery } from '../../../../features/feature_apis/roleApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUpdateData } from '../../../../features/helperSlice';
import { usePostRolePermissionMutation ,useUpdateRolePermissionMutation} from '../../../../features/feature_apis/allRolePermissionApi';
import AnimatedLayout from '../../../common/animated-layout';

const AddRolePermission = () => {
 // const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: groupPermissions, isSuccess } = useGetGorupPermissionsQuery();
  const { data: rolesData } = useGetRolesQuery();
  const [addRolePermission,{isLoading}] = usePostRolePermissionMutation();
  const [updateRolePermission,{isLoading: isUpdateLoading}] = useUpdateRolePermissionMutation();

  const { update_data } = useSelector((state) => state.HelperSlice);

  const treeData = useMemo(()=>{
    const result = [
      {
      title :'All',
      key:'0',
      children:groupPermissions?.data
    }
  ]
    return result;
  },[groupPermissions]);

 
  useEffect(()=>{
    if(update_data){
      form.setFieldsValue({role:update_data.role_id});
      const checkDatas = update_data?.permissions?.map(permission => permission.permission_id);
      setCheckedKeys(checkDatas);
    }else{
      setCheckedKeys([]);
    }
  },[])

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const onExpand = (expandedKeysValue) => {
    //console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    //console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };


  const onFinish = async (values) => {
    if(!checkedKeys.length){
      messageApi.error('Something field required!')
    }
    const filteredCheckedKeys = checkedKeys.filter(item => !String(item).startsWith('0'));

    const result = {
      role_id: values.role,
      permission : filteredCheckedKeys
    }
    const res = {
      permission:result.permission
    }
    // console.log({id:result.role_id,permission:result.permission});return;
    try {
      if(update_data){
        updateRolePermission({id:result.role_id,data:res})
        .unwrap()
        .then(async (res)=>{
          if(!res.error){
              dispatch(setUpdateData(null));
              messageApi.success(res.message);
              setExpandedKeys([]);
              setCheckedKeys([]);
              setSelectedKeys([]);
             navigate('/admin/user-management/role-permission')
          }else{
            messageApi.error(res.message)           
          }
        })
      }else{
        addRolePermission(result)
        .unwrap()
        .then(async (res)=>{
          if(!res.error){
              messageApi.success(res.message);
              setExpandedKeys([]);
              setCheckedKeys([]);
              setSelectedKeys([]);
          }else{
            messageApi.error(res.message)
          }
        })
      }
      
    } catch (error) {
      messageApi.error('Something went wrong!')
    }
   

  }

  const goBackHandler = () =>{
    if(update_data){
      dispatch(setUpdateData(null));
    }
   navigate('/admin/user-management/role-permission')
  }
  return (
    <AnimatedLayout>
      <Fragment>
      {contextHolder}
        <Flex justify="space-between" align="center">
          <Typography.Title
            style={{ marginTop: 0, marginBottom: 40 }}
            level={2}
          >
            Role and Permission Management
          </Typography.Title>
        </Flex>
        <Form form={form} layout="vertical" onFinish={onFinish}>

          <Form.Item
            label="Role Name"
            name="role"
            rules={[
              {
                required: true,
                message: "Please select role!",
              },
            ]}
          >
            <Select
              style={{ width: "200px" }}
              showSearch
              placeholder="Select a Role"
              //onChange={onRoleChange} // Call onRoleChange when role is selected
              allowClear
            >
              {rolesData?.data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
            <Tree
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={treeData}
            />
          <Form.Item>
            <Button 
            style={{marginTop:"20px"}}
            type="primary" 
            htmlType="submit"
            disabled={isLoading || isUpdateLoading}
            >
              {
                update_data  ? 'Update' : 'Save'
              }
            </Button>
            {
              update_data && <Button style={{marginLeft:10}} onClick={goBackHandler}>Go Back</Button>

            }

          </Form.Item>
        </Form>
      </Fragment>
    </AnimatedLayout>
  );
};
export default AddRolePermission;