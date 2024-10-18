import React from 'react'
import './errstyle.css'
import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { selectMenu, clearUser, selectRole } from '../../../../features/userSlice'
import { useSelector, useDispatch } from 'react-redux'

const ErrorPage404 = ({ errStatus = 404 }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const menus = useSelector(selectMenu)
	const role = useSelector(selectRole);

	const errorPageHandler = () => {
		if(role == 'user'){
			navigate('/dashboard')
		}else{
			navigate('/admin/dashboard')
		}
	}

	return (
		<div className='error-container'>
			<img
				src={`/src/assets/images/error-page/error${errStatus}.png`}
				alt='Error'
			/>
			<div className='text'>
				{/* Make changes here when more error status codes are added */}
				<h1>
					{errStatus === 404
						? 'Ooops!...Page Not Found'
						: 'Hey!... No Authorization Found'}
				</h1>

				{/* <Button type='primary' onClick={errorPageHandler}>
					{menus ? 'Go To Dashboard' : 'Go To Login'}
				</Button> */}
			</div>
		</div>
	)
}

export default ErrorPage404
