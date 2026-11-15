import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import AuthLayout from "../components/AuthLayout"
import InputField from "../components/InputField"
import Button from "../components/Button"
import Notice from "../components/Notice"

// step 1 of the password reset: the user types their email
// isAdmin = true is the administrator version (/admin/forgot-password)
const ForgotPassword = ({ isAdmin = false }) => {

  const navigate = useNavigate()

  // the start of every link on this page: "" for users, "/admin" for admins
  const base = isAdmin ? "/admin" : ""

  // /forgot-password?dialog=error shows the "email could not be sent" message
  const [searchParams] = useSearchParams()

  const [email, setEmail] = useState("")

  const [error, setError] = useState("")

  const [serverError] = useState(
    searchParams.get("dialog") === "error" ? "Unable to send password reset email. Please try again later." : ""
  )

  const handleSubmit = (e) => {

    e.preventDefault()

    const value = email.trim()

    // check the email (messages from the SRS)
    if (value === "") {
      setError("Email is required")
      return
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")

    // When the backend is connected:
    // try {
    //   await axios.post(BASE_URL + (isAdmin ? "/admin" : "/auth") + "/forgot-password", { email: value })
    // } catch (err) {
    //   setServerError("Unable to send password reset email. Please try again later.")
    //   return
    // }

    // the backend always gives the same answer (it never says if the email exists),
    // so the next page is always "Check your inbox"
    navigate(base + "/forgot-password/sent")
  }

  return (
    <AuthLayout isAdmin={isAdmin}>

      <p className="text-[11px] font-medium leading-4 text-brand">
        {isAdmin ? "ADMIN ACCESS" : "WELCOME TO TASKIVRA"}
      </p>

      <h1 className="text-[28px] font-bold leading-9 text-ink">Forgot your password?</h1>

      <p className="text-[14px] leading-[22px] text-muted">
        Enter your email and we’ll send a secure reset link.
      </p>

      {serverError !== "" && <Notice type="error" title="Action needed" body={serverError} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <InputField
          label={isAdmin ? "Administrator email *" : "Email *"}
          type="email"
          name="email"
          placeholder={isAdmin ? "admin@taskivra.app" : "saitama@example.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />

        <Button text="Send reset link" type="submit" className="w-full" />

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

export default ForgotPassword
