import { useNavigate } from "react-router-dom"

import { PREVIEW_MODE } from "../api/api"
import AuthLayout from "../components/AuthLayout"
import Button from "../components/Button"
import Notice from "../components/Notice"

// step 2 of the password reset: "Check your inbox"
const ResetEmailSent = ({ isAdmin = false }) => {

  const navigate = useNavigate()

  const base = isAdmin ? "/admin" : ""

  const resendEmail = () => {

    // When the backend is connected the same forgot-password request is sent again:
    // await axios.post(BASE_URL + (isAdmin ? "/admin" : "/auth") + "/forgot-password", { email })

    console.log("Resend reset email")
  }

  return (
    <AuthLayout isAdmin={isAdmin}>

      <p className="text-[11px] font-medium leading-4 text-brand">
        {isAdmin ? "ADMIN ACCESS" : "WELCOME TO TASKIVRA"}
      </p>

      <h1 className="text-[28px] font-bold leading-9 text-ink">Check your inbox</h1>

      <p className="text-[14px] leading-[22px] text-muted">
        If an eligible account exists, reset instructions will be sent to its email.
      </p>

      <Notice
        type="success"
        title="Reset link sent"
        body="The link expires in 15 minutes. Check your spam folder if you don’t see it."
      />

      {/* In the real app the user opens the link from the email.
          This button is only shown in preview mode so the next screen can be reached. */}
      {PREVIEW_MODE && (
        <Button
          text="Reset password"
          className="w-full"
          onClick={() => navigate(base + "/reset-password/preview-token")}
        />
      )}

      <Button text="Resend email" variant="secondary" className="w-full" onClick={resendEmail} />

      <Button
        text="Back to sign in"
        variant="ghost"
        className="w-full"
        onClick={() => navigate(base + "/login")}
      />

    </AuthLayout>
  )
}

export default ResetEmailSent
