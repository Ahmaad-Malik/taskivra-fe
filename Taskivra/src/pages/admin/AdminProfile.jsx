import { useContext, useState } from "react"
import { useSearchParams } from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import AdminLayout from "../../components/AdminLayout"
import Button from "../../components/Button"
import Badge from "../../components/Badge"
import Notice from "../../components/Notice"
import ChangePasswordModal from "../../components/ChangePasswordModal"

const AdminProfile = () => {

  const { admin } = useContext(AuthContext)

  // preview from the url: /admin/profile?dialog=change-password | password-changed
  const [searchParams] = useSearchParams()
  const dialog = searchParams.get("dialog")

  const [showPassword, setShowPassword] = useState(dialog === "change-password" || dialog === "password-changed")

  return (
    <AdminLayout active="profile" breadcrumb="Administration / Administrator profile">

      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold leading-9 text-ink">Administrator profile</h1>
        <p className="text-[14px] leading-[22px] text-muted">Secure account access for system administration.</p>
      </div>

      <div className="flex w-full max-w-[800px] flex-col gap-4 rounded-2xl border border-white bg-white/66 p-6 shadow-[0px_8px_28px_0px_rgba(41,48,102,0.08)]">

        <p className="text-[40px] font-bold leading-[48px] text-brand">SA</p>

        <p className="text-[20px] font-semibold leading-7 text-ink">{admin.name}</p>

        <Badge text="Authorized admin" />

        <div className="text-[14px] leading-[22px] text-muted">
          <p>Admin ID: {admin.id}</p>
          <p>Email: {admin.email}</p>
          <p>Role: {admin.role}</p>
          <p>Last sign-in: {admin.lastSignIn}</p>
        </div>

        <Button text="Change admin password" className="w-[240px]" onClick={() => setShowPassword(true)} />

        <Notice
          type="info"
          title="Separate from user accounts"
          body="Admin access is limited to account management, aggregate statistics and system monitoring."
        />

      </div>

      {showPassword && (
        <ChangePasswordModal
          isAdmin={true}
          startDone={dialog === "password-changed"}
          onClose={() => setShowPassword(false)}
        />
      )}

    </AdminLayout>
  )
}

export default AdminProfile
