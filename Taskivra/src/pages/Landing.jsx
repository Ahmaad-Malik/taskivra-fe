import { Navigate } from "react-router-dom"

// there is no landing page design yet, so "/" opens the login page
const Landing = () => {
  return <Navigate to="/login" />
}

export default Landing
