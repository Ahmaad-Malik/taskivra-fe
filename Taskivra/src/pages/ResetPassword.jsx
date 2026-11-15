import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import AuthLayout from "../components/AuthLayout"
import PasswordField from "../components/PasswordField"
import PasswordStrength from "../components/PasswordStrength"
import Button from "../components/Button"
import { checkPassword } from "../utils/password"

// step 3 of the password reset: the user opened the link from the email
// the link looks like /reset-password/abc123 (abc123 is the token)
const ResetPassword = ({ isAdmin = false }) => {

  const navigate = useNavigate()

  const base = isAdmin ? "/admin" : ""

  const { token } = useParams()

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    // check the values (messages from the SRS)
    const newErrors = {}

    const passwordError = checkPassword(formData.password, "New Password")
    if (passwordError !== "") newErrors.password = passwordError

    if (formData.confirmPassword === "") newErrors.confirmPassword = "Confirm New Password is required"
    else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    // When the backend is connected:
    // try {
    //   await axios.post(BASE_URL + (isAdmin ? "/admin" : "/auth") + "/reset-password", {
    //     token: token,
    //     password: formData.password
    //   })
    // } catch (err) {
    //   if the link is invalid or expired -> navigate(base + "/reset-password/expired")
    //   if the server is down -> show "Unable to process your password reset request. Please try again later."
    //   return
    // }

    console.log("Reset password with token: ", token)

    navigate(base + "/reset-password/success")
  }

  return (
    <AuthLayout isAdmin={isAdmin}>

      <p className="text-[11px] font-medium leading-4 text-brand">
        {isAdmin ? "ADMIN ACCESS" : "WELCOME TO TASKIVRA"}
      </p>

      <h1 className="text-[28px] font-bold leading-9 text-ink">Set a new password</h1>

      <p className="text-[14px] leading-[22px] text-muted">
        Choose a strong password you haven’t used before.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <PasswordField
          label="New password *"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <PasswordStrength password={formData.password} />

        <PasswordField
          label="Confirm password *"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button text="Reset password" type="submit" className="w-full" />

      </form>

      <Button
        text="Back to sign in"
        variant="ghost"
        className="w-full"
        onClick={() => navigate(base + "/login")}
      />

    </AuthLayout>
  )
}

export default ResetPassword
