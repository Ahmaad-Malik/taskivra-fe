import { useContext, useState } from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import { PREVIEW_MODE } from "../../api/api"
import AuthLayout from "../../components/AuthLayout"
import InputField from "../../components/InputField"
import PasswordField from "../../components/PasswordField"
import Button from "../../components/Button"
import Modal from "../../components/Modal"
import Notice from "../../components/Notice"
import Skeleton from "../../components/Skeleton"

const AdminLogin = () => {

  const { admin, loggedOut, setLoggedOut } = useContext(AuthContext)

  // the popups can be opened from the url while the backend is not connected:
  // /admin/login?dialog=loading     "Opening admin console"
  // /admin/login?dialog=error       "Admin sign-in failed"
  // /admin/login?dialog=logged-out  "Admin session ended" (opened after logout)
  const [searchParams] = useSearchParams()
  const dialog = searchParams.get("dialog")

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [remember, setRemember] = useState(false)

  const [errors, setErrors] = useState({})

  // shows the "Opening admin console" popup (add setLoading back when the API is connected)
  const [loading] = useState(dialog === "loading")

  // shows the "Admin sign-in failed" popup with this message
  const [errorMessage, setErrorMessage] = useState(dialog === "error" ? "Invalid email or password" : "")

  const [showLoggedOut, setShowLoggedOut] = useState(dialog === "logged-out")

  // an admin who is already logged in goes straight to the admin dashboard
  if (admin !== null && !PREVIEW_MODE) {
    return <Navigate to="/admin/dashboard" />
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {

    e.preventDefault()                 // 1. stop the form from refreshing the page

    const email = formData.email.trim()
    const password = formData.password

    // 2. check the values (messages are taken from the SRS US-34)
    const newErrors = {}

    if (email === "") newErrors.email = "Email is required"
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) newErrors.email = "Please enter a valid email address"

    if (password === "") newErrors.password = "Password is required"

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    // 3. send the values to the backend
    //
    // The admin login API is not connected yet, so the form stops here.
    // When the backend is connected, only this part changes:
    //
    // setLoading(true)
    // try {
    //   const response = await axios.post(BASE_URL + "/admin/login", { email, password, remember })
    //   localStorage.setItem("adminToken", response.data.token)
    //   setAdmin(response.data.admin)
    //   navigate("/admin/dashboard")
    // } catch (err) {
    //   if the account is not an admin -> setErrorMessage("You are not authorized to access the administrator panel.")
    //   if too many attempts           -> setErrorMessage("Too many login attempts. Please try again later")
    //   if the server is down          -> setErrorMessage("Unable to log in at the moment. Please try again later")
    //   if the internet failed         -> setErrorMessage("Connection error. Please check your internet and try again.")
    //   otherwise                      -> setErrorMessage("Invalid email or password")
    // } finally {
    //   setLoading(false)
    // }

    console.log("Admin login data: ", { email, remember })
  }

  return (
    <AuthLayout isAdmin={true}>

      <p className="text-[11px] font-medium leading-4 text-brand">ADMIN ACCESS</p>

      <h1 className="text-[28px] font-bold leading-9 text-ink">Administrator sign in</h1>

      <p className="text-[14px] leading-[22px] text-muted">Sign in to the secure admin console.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <InputField
          label="Email *"
          type="email"
          name="email"
          placeholder="admin@taskivra.app"
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

          <Link to="/admin/forgot-password" className="text-[12px] leading-[18px] text-brand">
            Forgot password?
          </Link>

        </div>

        <Button text="Sign in" type="submit" disabled={loading} className="w-full" />

      </form>

      <Link to="/login" className="text-[12px] leading-[18px] text-brand">
        Return to user sign in →
      </Link>

      <p className="text-[12px] leading-[18px] text-muted">
        By continuing, you agree to our terms and privacy policy.
      </p>

      {/* popup: opening admin console */}
      {loading && (
        <Modal title="Opening admin console" body="Checking administrator access…">
          <Skeleton />
          <Skeleton />
          <Button text="Continue" variant="secondary" className="w-full" />
        </Modal>
      )}

      {/* popup: admin login failed */}
      {errorMessage !== "" && (
        <Modal title="Admin sign-in failed" body="Invalid credentials. Please enter the valid credentials.">
          <Notice type="error" title="Action needed" body={errorMessage} />
          <Button text="Return and retry" onClick={() => setErrorMessage("")} className="w-full" />
        </Modal>
      )}

      {/* popup: shown after the admin logs out */}
      {(showLoggedOut || loggedOut === "admin") && (
        <Modal title="Admin session ended" body="You have been securely signed out.">
          <Notice type="success" title="Success" body="Logged out successfully" />
          <Button
            text="Admin sign in"
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

export default AdminLogin
