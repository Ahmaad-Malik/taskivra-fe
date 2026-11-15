import { useContext, useState } from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom"

import AuthContext from "../context/AuthContext"
import { PREVIEW_MODE } from "../api/api"
import AuthLayout from "../components/AuthLayout"
import InputField from "../components/InputField"
import PasswordField from "../components/PasswordField"
import Button from "../components/Button"
import Modal from "../components/Modal"
import Notice from "../components/Notice"
import Skeleton from "../components/Skeleton"

const Login = () => {

  const { user, loggedOut, setLoggedOut } = useContext(AuthContext)

  // the popups can be opened from the url while the backend is not connected:
  // /login?dialog=loading    "Signing you in"
  // /login?dialog=error      "We couldn't sign you in"
  // /login?dialog=blocked    "Your account is blocked"
  // /login?dialog=logged-out "You're signed out" (opened after logout)
  const [searchParams] = useSearchParams()
  const dialog = searchParams.get("dialog")

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [remember, setRemember] = useState(false)

  const [errors, setErrors] = useState({})

  // shows the "Signing you in" popup (add setLoading back when the login API is connected)
  const [loading] = useState(dialog === "loading")

  // shows the "We couldn't sign you in" popup with this message
  const [errorMessage, setErrorMessage] = useState(dialog === "error" ? "Invalid email or password" : "")

  const [showBlocked, setShowBlocked] = useState(dialog === "blocked")

  const [showLoggedOut, setShowLoggedOut] = useState(dialog === "logged-out")

  // a user who is already logged in does not need the login page (SRS US-02)
  if (user !== null && !PREVIEW_MODE) {
    return <Navigate to="/dashboard" />
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {

    e.preventDefault()                 // 1. stop the form from refreshing the page

    const email = formData.email.trim()
    const password = formData.password

    // 2. check the values (messages are taken from the SRS acceptance criteria)
    const newErrors = {}

    if (email === "") newErrors.email = "Email is required"
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) newErrors.email = "Please enter a valid email address"

    if (password === "") newErrors.password = "Password is required"

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    // 3. send the values to the backend
    //
    // The login API is not connected yet, so the form stops here.
    // When the backend is connected, only this part changes:
    //
    // setLoading(true)
    // try {
    //   const response = await axios.post(BASE_URL + "/auth/login", { email, password, remember })
    //   localStorage.setItem("token", response.data.token)
    //   setUser(response.data.user)
    //   navigate("/dashboard")
    // } catch (err) {
    //   if the account is blocked           -> setShowBlocked(true)
    //   if too many attempts                -> setErrorMessage("Too many login attempts. Please try again later.")
    //   if the server is down               -> setErrorMessage("Unable to log in at the moment. Please try again later.")
    //   if the internet connection failed   -> setErrorMessage("Connection error. Please check your internet and try again.")
    //   otherwise (wrong email or password) -> setErrorMessage("Invalid email or password")
    // } finally {
    //   setLoading(false)
    // }

    console.log("Login data: ", { email, remember })
  }

  return (
    <AuthLayout>

      <p className="text-[11px] font-medium leading-4 text-brand">WELCOME TO TASKIVRA</p>

      <h1 className="text-[28px] font-bold leading-9 text-ink">Welcome back</h1>

      <p className="text-[14px] leading-[22px] text-muted">Sign in to your personal workspace.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <InputField
          label="Email *"
          type="email"
          name="email"
          placeholder="saitama@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <PasswordField
          label="Password *"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        {/* login preferences */}
        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-5 w-5 shrink-0 rounded accent-brand"
          />

          <p className="flex-1 text-[12px] leading-[18px] text-muted">Remember me</p>

          <Link to="/forgot-password" className="text-[12px] leading-[18px] text-brand">
            Forgot password?
          </Link>

        </div>

        <Button text="Sign in" type="submit" disabled={loading} className="w-full" />

      </form>

      <Link to="/register" className="text-[14px] leading-[22px] text-brand">
        Create an account →
      </Link>

      <Link to="/admin/login" className="text-[12px] leading-[18px] text-muted">
        Administrator sign in →
      </Link>

      <p className="text-[12px] leading-[18px] text-muted">
        By continuing, you agree to our terms and privacy policy.
      </p>

      {/* popup: signing you in */}
      {loading && (
        <Modal title="Signing you in" body="Checking your credentials securely…">
          <Skeleton />
          <Skeleton />
          <Button text="Continue" variant="secondary" className="w-full" />
        </Modal>
      )}

      {/* popup: login failed */}
      {errorMessage !== "" && (
        <Modal title="We couldn’t sign you in" body="Invalid credentials. Please enter valid credentials.">
          <Notice type="error" title="Action needed" body={errorMessage} />
          <Button text="Return and retry" onClick={() => setErrorMessage("")} className="w-full" />
        </Modal>
      )}

      {/* popup: account blocked */}
      {showBlocked && (
        <Modal title="Your account is blocked" body="Contact your system administrator to restore access.">
          <Notice type="error" title="Action needed" body="Your account has been blocked. Please contact support." />
          <Button text="Return and retry" onClick={() => setShowBlocked(false)} className="w-full" />
        </Modal>
      )}

      {/* popup: shown after logging out */}
      {(showLoggedOut || loggedOut === "user") && (
        <Modal title="You’re signed out" body="Your session has ended securely.">
          <Notice type="success" title="Success" body="Logged out successfully" />
          <Button
            text="Sign in again"
            className="w-full"
            onClick={() => {
              setShowLoggedOut(false)
              setLoggedOut("")
            }}
          />
        </Modal>
      )}

    </AuthLayout>
  )
}

export default Login
