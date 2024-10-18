import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { selectIsAuthenticated, selectToken } from '../../features/userSlice'
import { useSelector } from 'react-redux'

const PrivateRoutes = ({ children }) => {
	const token = useSelector(selectToken);
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const navigate = useNavigate()
	const location = useLocation()

	const checkToken = () => {
		if (token && isAuthenticated) {
			location.pathname == '/admin/login'
				? navigate('/admin/dashboard')
				: navigate(location.pathname)
		} else {
			navigate('/admin/login')
		}
	}

	useEffect(() => {
		checkToken()
	}, [navigate])

	return children
}

export default PrivateRoutes
