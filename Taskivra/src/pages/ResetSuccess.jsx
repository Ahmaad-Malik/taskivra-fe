import { useNavigate } from "react-router-dom"

import AuthLayout from "../components/AuthLayout"
import Button from "../components/Button"
import Notice from "../components/Notice"

// step 4 of the password reset: "Password updated"
const ResetSuccess = ({ isAdmin = false }) => {

  const navigate = useNavigate()

  const base = isAdmin ? "/admin" : ""

  return (
    <AuthLayout isAdmin={isAdmin}>

      <p className="text-[11px] font-medium leading-4 text-brand">
        {isAdmin ? "ADMIN ACCESS" : "WELCOME TO TASKIVRA"}
      </p>

      <h1 className="text-[28px] font-bold leading-9 text-ink">Password updated</h1>

      <p className="text-[14px] leading-[22px] text-muted">
        You can now sign in with your new password.
      </p>

      <Notice type="success" title="Your account is secure" body="Your previous sessions have been signed out." />

      <Button text="Continue to sign in" className="w-full" onClick={() => navigate(base + "/login")} />

    </AuthLayout>
  )
}

export default ResetSuccess
