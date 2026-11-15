import { useNavigate } from "react-router-dom"

import AuthLayout from "../components/AuthLayout"
import Button from "../components/Button"
import Notice from "../components/Notice"

// shown when the reset link is wrong, already used or older than 15 minutes
const ResetExpired = ({ isAdmin = false }) => {

  const navigate = useNavigate()

  const base = isAdmin ? "/admin" : ""

  return (
    <AuthLayout isAdmin={isAdmin}>

      <p className="text-[11px] font-medium leading-4 text-brand">
        {isAdmin ? "ADMIN ACCESS" : "WELCOME TO TASKIVRA"}
      </p>

      <h1 className="text-[28px] font-bold leading-9 text-ink">This link has expired</h1>

      <p className="text-[14px] leading-[22px] text-muted">
        Reset links are valid for 15 minutes and can only be used once.
      </p>

      <Notice type="warning" title="Request a fresh link" body="Your password has not been changed." />

      <Button text="Send a new link" className="w-full" onClick={() => navigate(base + "/forgot-password")} />

      <Button
        text="Back to sign in"
        variant="ghost"
        className="w-full"
        onClick={() => navigate(base + "/login")}
      />

    </AuthLayout>
  )
}

export default ResetExpired
