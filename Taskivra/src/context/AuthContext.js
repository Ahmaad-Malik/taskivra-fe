import { createContext } from "react"

// holds the logged in user and admin:
// { user, setUser, admin, setAdmin, loggedOut, setLoggedOut }
// user is null when no user is logged in, admin is null when no admin is logged in
const AuthContext = createContext()

export default AuthContext
