import React from 'react'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Typography } from 'antd'
import { clearUser } from '../../../../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography

const Profile = () => {

	const { user } = useSelector((state) => state.user);

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const logoutHandler = () => {
		dispatch(clearUser())
		navigate('/admin/login')
		// logout api function call here
	}
	const items = [
		{
			label:`${user?.name}`,
			key: '0',
		},

		{
			type: 'divider',
		},
		{
			label: (
				<a
					onClick={logoutHandler}
					style={{ alignContent: 'center', alignItems: 'center' }}
				>
					<Text style={{ marginRight: '8px' }}>Logout</Text>
					<LogoutOutlined style={{ color: 'red' }} />
				</a>
			),
			key: '3',
		},
	]

	return (
		<Dropdown menu={{ items }} trigger={['click']} type='text'>
			<a onClick={(e) => e.preventDefault()}>
				<Badge>
					<Avatar src={user?.photo} />
				</Badge>
			</a>
		</Dropdown>
	)
}

export default Profile
