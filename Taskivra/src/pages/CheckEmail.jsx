import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import { PREVIEW_MODE } from "../api/api"
import AuthLayout from "../components/AuthLayout"
import Button from "../components/Button"
import Notice from "../components/Notice"

// shown after registering: "Check your email"
// the page is opened as /register/check-email?email=name@example.com
// /register/check-email?resent=yes shows the "Verification email sent" version
const CheckEmail = () => {

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const email = searchParams.get("email") || "your email address"

  const [resent, setResent] = useState(searchParams.get("resent") === "yes")

  const resendEmail = () => {

    // When the backend is connected:
    // await axios.post(BASE_URL + "/auth/resend-verification", { email })

    setResent(true)
  }

  const checkStatus = () => {

    // When the backend is connected, ask the backend if the email is verified yet:
    // const response = await axios.get(BASE_URL + "/auth/verification-status?email=" + email)
    // if (response.data.verified) navigate("/verify-email")

    // preview: open the "Email verified" page
    if (PREVIEW_MODE) navigate("/verify-email/preview-token")
  }

  return (
    <AuthLayout>

      <Button text="← Back to sign in" variant="ghost" className="w-full" onClick={() => navigate("/login")} />

      <p className="text-[11px] font-medium leading-4 text-brand">ACCOUNT VERIFICATION</p>

      <h1 className="text-[28px] font-bold leading-9 text-ink">
        {resent ? "Verification email sent" : "Check your email"}
      </h1>

      <p className="text-[14px] leading-[22px] text-muted">We sent a verification link to {email}.</p>

      {resent ? (
        <Notice
          type="success"
          title="New verification email sent"
          body="Click “Verify email address” in the email to activate your account."
        />
      ) : (
        <Notice
          type="info"
          title="Open the link in your email"
          body="Click “Verify email address” in the email to activate your account."
        />
      )}

      <Button text="Check verification status" className="w-full" onClick={checkStatus} />

      <Button text="Resend verification email" variant="secondary" className="w-full" onClick={resendEmail} />

      <p className="text-[12px] leading-[18px] text-muted">
        If the email is missing, check your spam or junk folder.
      </p>

    </AuthLayout>
  )
}

export default CheckEmail
