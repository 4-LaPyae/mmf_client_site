// RoleMiddleware.js
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectRole } from '../../features/userSlice'

const RoleMiddleware = ({ allowedRoles, children }) => {
  const checkRole = useSelector(selectRole);

  // Check if the user has any of the allowed roles
  const hasRole = allowedRoles.some(role => checkRole?.includes(role))

  if (!hasRole) {
    // Redirect to login or unauthorized page if no valid role is found
    return <Navigate to="/404" replace />
  }

  // If user has a valid role, render the children components
  return children
}

export default RoleMiddleware
