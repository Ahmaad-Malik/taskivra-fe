import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

// wraps a page so only a logged in admin can open it
// a normal user login does not count, the admin has a separate login
// if no admin is logged in, they are sent to the admin login page
const RequireAdmin = ({ children }) => {

  const { admin } = useContext(AuthContext)

  if (admin === null) {
    return <Navigate to="/admin/login" />
  }

  return children
}

export default RequireAdmin
