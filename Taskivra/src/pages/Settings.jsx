import { useContext, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import AuthContext from "../context/AuthContext"
import UserLayout from "../components/UserLayout"
import Button from "../components/Button"
import Notice from "../components/Notice"
import ChangePasswordModal from "../components/ChangePasswordModal"
import DeleteAccountModal from "../components/DeleteAccountModal"

// the tabs at the top of the settings page
const tabs = ["Account & security", "Notifications", "Calendar", "AI drafts"]

const Settings = () => {

  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  // preview from the url:
  // /settings?dialog=change-password | password-changed | delete-account | deleting | account-deleted
  const [searchParams] = useSearchParams()
  const dialog = searchParams.get("dialog")

  const [activeTab, setActiveTab] = useState("Account & security")

  const [showPassword, setShowPassword] = useState(dialog === "change-password" || dialog === "password-changed")

  const [showDelete, setShowDelete] = useState(
    dialog === "delete-account" || dialog === "deleting" || dialog === "account-deleted"
  )

  // which step the delete popup opens on (only different when previewing)
  let deleteStep = "confirm"
  if (dialog === "deleting") deleteStep = "deleting"
  if (dialog === "account-deleted") deleteStep = "deleted"

  const cardClasses =
    "flex flex-col gap-4 rounded-2xl border border-white bg-white p-6 shadow-[0px_8px_28px_0px_rgba(41,48,102,0.08)]"

  return (
    <UserLayout active="settings" breadcrumb="Workspace / Settings">

      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold leading-9 text-ink">Settings</h1>
        <p className="text-[14px] leading-[22px] text-muted">Manage your account and choose how Taskivra works for you.</p>
      </div>

      {/* tabs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tabs.map((tab) => (
          <Button
            key={tab}
            text={tab}
            variant={activeTab === tab ? "primary" : "secondary"}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>

      {activeTab === "Account & security" ? (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* account card */}
            <div className={cardClasses}>
              <h2 className="text-[20px] font-semibold leading-7 text-ink">Account</h2>
              <p className="text-[16px] font-semibold leading-6 text-ink">{user.firstName} {user.lastName}</p>
              <p className="text-[14px] leading-[22px] text-muted">Manage your name and email address from your profile.</p>
              <Button text="Manage profile" variant="secondary" className="w-[200px]" onClick={() => navigate("/profile")} />
            </div>

            {/* security card */}
            <div className={cardClasses}>
              <h2 className="text-[20px] font-semibold leading-7 text-ink">Security</h2>
              <p className="text-[16px] font-semibold leading-6 text-ink">Password</p>
              <p className="text-[14px] leading-[22px] text-muted">Change the password you use to sign in to Taskivra.</p>
              <Button text="Change password" variant="secondary" className="w-[200px]" onClick={() => setShowPassword(true)} />
            </div>

          </div>

          {/* delete account card */}
          <div className={cardClasses}>
            <h2 className="text-[20px] font-semibold leading-7 text-ink">Delete account</h2>
            <p className="text-[14px] leading-[22px] text-muted">Permanently delete your account and its associated data.</p>
            <Button text="Delete account" variant="danger" className="w-[180px]" onClick={() => setShowDelete(true)} />
          </div>
        </>
      ) : (
        <div className="max-w-[560px]">
          <Notice type="info" title={activeTab + " settings"} body="These settings are coming in a later sprint." />
        </div>
      )}

      {showPassword && (
        <ChangePasswordModal startDone={dialog === "password-changed"} onClose={() => setShowPassword(false)} />
      )}

      {showDelete && <DeleteAccountModal startStep={deleteStep} onClose={() => setShowDelete(false)} />}

    </UserLayout>
  )
}

export default Settings
