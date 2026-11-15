import { useState } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"

import AuthLayout from "../components/AuthLayout"
import Notice from "../components/Notice"
import Button from "../components/Button"

// the user opens this page from the link in the verification email,
// for example: /verify-email/abc123   (abc123 is the token)
const VerifyEmail = () => {

  const navigate = useNavigate()

  const { token } = useParams()

  // the result of checking the link: "verified", "invalid" or "expired"
  // preview from the url: /verify-email/abc123?dialog=invalid or ?dialog=expired
  const [searchParams] = useSearchParams()
  const dialog = searchParams.get("dialog")

  let result = "verified"
  if (dialog === "invalid") result = "invalid"
  if (dialog === "expired") result = "expired"

  // When the backend is connected the page asks the backend to check the token:
  // useEffect(() => {
  //   const verify = async () => {
  //     try {
  //       const response = await axios.get(BASE_URL + "/auth/verify-email/" + token)
  //       setEmail(response.data.email)
  //       setResult("verified")
  //     } catch (err) {
  //       setResult(err.response.data.reason)   // "invalid" or "expired"
  //     }
  //   }
  //   verify()
  // }, [])
  const [email] = useState("saitama@example.com")

  console.log("Verification token: ", token)

  const resendEmail = () => {

    // When the backend is connected:
    // await axios.post(BASE_URL + "/auth/resend-verification", { token })

    navigate("/register/check-email?resent=yes")
  }

  // the link is wrong or was already used
  if (result === "invalid") {
    return (
      <AuthLayout>
        <Button text="← Back to sign in" variant="ghost" className="w-full" onClick={() => navigate("/login")} />
        <p className="text-[11px] font-medium leading-4 text-brand">ACCOUNT VERIFICATION</p>
        <h1 className="text-[28px] font-bold leading-9 text-ink">This verification link is invalid</h1>
        <Notice
          type="warning"
          title="Request a new verification email"
          body="This link is invalid or has already been used. Request a new verification email if your account is still unverified."
        />
        <Button text="Resend verification email" className="w-full" onClick={resendEmail} />
      </AuthLayout>
    )
  }

  // the link is too old
  if (result === "expired") {
    return (
      <AuthLayout>
        <Button text="← Back to sign in" variant="ghost" className="w-full" onClick={() => navigate("/login")} />
        <p className="text-[11px] font-medium leading-4 text-brand">ACCOUNT VERIFICATION</p>
        <h1 className="text-[28px] font-bold leading-9 text-ink">This verification link has expired</h1>
        <Notice
          type="warning"
          title="Request a new verification email"
          body="This link has expired. Resend the verification email and open its latest link."
        />
        <Button text="Resend verification email" className="w-full" onClick={resendEmail} />
      </AuthLayout>
    )
  }

  // the email is verified
  return (
    <AuthLayout>

      <p className="text-[11px] font-medium leading-4 text-teal">EMAIL CONFIRMED</p>

      <h1 className="text-[28px] font-bold leading-9 text-ink">Email verified</h1>

      <p className="text-[14px] leading-[22px] text-muted">
        Your email address has been verified. Sign in to start managing your tasks.
      </p>

      <Notice title="Verification complete" body={email + " is verified."} />

      <Button text="Continue to sign in" onClick={() => navigate("/login")} className="w-full" />

    </AuthLayout>
  )
}

export default VerifyEmail
