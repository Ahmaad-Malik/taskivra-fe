import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

// wraps a page so only a logged in user can open it
// if nobody is logged in, the user is sent to the login page
const RequireUser = ({ children }) => {

  const { user } = useContext(AuthContext)

  if (user === null) {
    return <Navigate to="/login" />
  }

  return children
}

export default RequireUser
