import { useSelector } from 'react-redux'
import { Suspense, lazy } from 'react'
import { selectMenu } from '../../features/userSlice'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import useModifiedRoutes from '../../hooks/routes/use-modifed-routes'
import LoadingFallback from '../../components/common/loading-fallback'
import PrivateRoutes from './privateRoutes'
import ScrollToTop from '../../components/common/scroll-to-top'
import UserLogin from '../../components/user/auth/UserLogin'
import UserDashboard from '../../components/user/dashboard/UserDashboard'
import PrivateUserRoutes from './PrivateUserRoutes'
import Dashboard from '../../components/admin/dashboard'
import Roles from '../../components/admin/user-management/role'
import Permissions from '../../components/admin/user-management/permission'
import AddRolePermission from '../../components/admin/user-management/add-role-permission'
import RolePermission from '../../components/admin/user-management/role-permission'
import SystemAdmin from '../../components/admin/system-admin'
import User from '../../components/admin/employee'
import Team from '../../components/admin/team'
import Township from '../../components/admin/township'
import TypePersons from '../../components/admin/type-person'
import Profile from '../../components/admin/profile'
const Login = lazy(() => import('../../components/admin/authentication/login/index'))
const AppLayout = lazy(() => import('../../components/admin/layouts'))
const ErrorPage404 = lazy(() => import('../../components/admin/error-pages/404'))

const Router = () => {
	const config = createBrowserRouter([
		{
			path: '/admin/login',
			element: (
				<PrivateRoutes>
					<Suspense fallback={<LoadingFallback />}>
						<Login />
					</Suspense>
				</PrivateRoutes>
			),
		},
		{
			path: '/admin/',
			element: (
					<Suspense fallback={<LoadingFallback />}>
						<ScrollToTop />
						<AppLayout />
					</Suspense>
			),
			children: [
				{
					path: 'dashboard',
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<Dashboard />
						</Suspense>
					),
				},
				{
					path: 'user-management/role',
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<Roles />
						</Suspense>
					),
				},
				{
					path: 'user-management/permission',
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<Permissions />
						</Suspense>
					),
				},
				{
					path: 'user-management/add-role-permission',
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<AddRolePermission />
						</Suspense>
					),
				},
				{
					path: 'user-management/role-permission',
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<RolePermission />
						</Suspense>
					),
				},
				{
					path: 'system-admin',
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<SystemAdmin />
						</Suspense>
					),
				},
				{
					path: 'employee',
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<User />
						</Suspense>
					),
				},
				{
					path: 'team',
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<Team />
						</Suspense>
					),
				},
				{
					path: 'township',
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<Township />
						</Suspense>
					),
				},
				{
					path: 'type-person',
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<TypePersons />
						</Suspense>
					),
				},
				{
					path: 'profile',
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<Profile />
						</Suspense>
					),
				},
				
			],
		},
		{
			path: '/login',
			element: (
				<PrivateUserRoutes>
					<Suspense fallback={<LoadingFallback />}>
						<UserLogin />
					</Suspense>
				</PrivateUserRoutes>
			),
		},
		{
			path: '/dashboard',
			element: (
				<Suspense fallback={<LoadingFallback />}>
					<UserDashboard />
				</Suspense>
			),
		},
		{
			path: '/*',
			element: (
				<PrivateUserRoutes>	
					<ErrorPage404 />
				</PrivateUserRoutes>
			),
		},
	])

	return <RouterProvider router={config} />
}

export default Router