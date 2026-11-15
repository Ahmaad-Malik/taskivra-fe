import { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"

import AuthContext from "../context/AuthContext"
import BASE_URL, { PREVIEW_MODE } from "../api/api"
import UserLayout from "../components/UserLayout"
import Button from "../components/Button"
import Badge from "../components/Badge"
import Notice from "../components/Notice"
import Skeleton from "../components/Skeleton"
import ChangePasswordModal from "../components/ChangePasswordModal"
import DeleteAccountModal from "../components/DeleteAccountModal"

// shows "Not provided" instead of an empty value (SRS US-05)
const show = (value) => {
  if (value) return value
  return "Not provided"
}

// "2003-05-15" -> "May 15, 2003"
const formatDate = (date) => {
  if (!date) return "Not provided"
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
}

const Profile = () => {

  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  // preview from the url:
  // /profile?dialog=loading | error | change-password | password-changed | delete-account
  const [searchParams] = useSearchParams()
  const dialog = searchParams.get("dialog")

  // State Management (same as the UserList page from class)
  // In PREVIEW_MODE the demo user is shown straight away and the API is not called.
  // ?dialog=loading and ?dialog=error show those two states for checking the design.
  const [profile, setProfile] = useState(PREVIEW_MODE ? user : null)
  const [loading, setLoading] = useState(!PREVIEW_MODE || dialog === "loading")
  const [error, setError] = useState(dialog === "error" ? "Unable to load profile information. Please try again." : "")

  const [showPassword, setShowPassword] = useState(dialog === "change-password" || dialog === "password-changed")
  const [showDelete, setShowDelete] = useState(dialog === "delete-account")

  // changing this number loads the profile again (used by the Retry button)
  const [reload, setReload] = useState(0)

  // useEffect to call the API when the page opens, and again after Retry
  useEffect(() => {

    if (PREVIEW_MODE) return     // preview: the demo user is already in the state

    // Fetch Data Function
    const fetchProfile = async () => {
      try {
        const response = await axios.get(BASE_URL + "/users/me", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })

        // Save data into state
        setProfile(response.data)

      } catch (err) {
        console.log(err)
        setError("Unable to load profile information. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()

  }, [reload])

  const retry = () => {
    setError("")
    if (PREVIEW_MODE) return     // preview: the demo user is already loaded
    setLoading(true)
    setReload(reload + 1)
  }

  return (
    <UserLayout active="profile" breadcrumb="Workspace / Your profile">

      {/* page heading */}
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-[28px] font-bold leading-9 text-ink">Your profile</h1>
          <p className="text-[14px] leading-[22px] text-muted">View your account information.</p>
        </div>
        <Button text="Edit profile" className="w-[154px]" onClick={() => navigate("/profile/edit")} />
      </div>

      {/* loading */}
      {loading && (
        <div className="flex max-w-[760px] flex-col gap-4">
          <Skeleton />
          <Skeleton />
        </div>
      )}

      {/* error with a retry button */}
      {!loading && error !== "" && (
        <div className="flex max-w-[560px] flex-col gap-4">
          <Notice type="error" title="Action needed" body={error} />
          <Button text="Retry" variant="secondary" className="w-[154px]" onClick={retry} />
        </div>
      )}

      {/* no profile record */}
      {!loading && error === "" && profile === null && (
        <p className="text-[14px] leading-[22px] text-muted">Profile information not available</p>
      )}

      {/* the profile */}
      {!loading && error === "" && profile !== null && (
        <div className="flex flex-wrap items-start gap-6">

          {/* identity card */}
          <div className="flex w-full max-w-[360px] flex-col gap-4 rounded-2xl border border-white bg-white/66 p-6 shadow-[0px_8px_28px_0px_rgba(41,48,102,0.08)]">
            <p className="text-[40px] font-bold leading-[48px] text-brand">
              {profile.firstName[0]}{profile.lastName[0]}
            </p>
            <p className="text-[20px] font-semibold leading-7 text-ink">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-[14px] leading-[22px] text-muted">@{profile.username}</p>
            <Badge text={show(profile.status)} />
            <p className="text-[12px] leading-[18px] text-muted">
              {show(profile.profession)} · Member since {show(profile.memberSince)}
            </p>
          </div>

          {/* account details card */}
          <div className="flex w-full max-w-[760px] flex-1 flex-col gap-4 rounded-2xl border border-white bg-white/66 p-6 shadow-[0px_8px_28px_0px_rgba(41,48,102,0.08)]">

            <DetailRow label="User ID" value={show(profile.id)} />
            <DetailRow label="Username" value={show(profile.username)} />
            <DetailRow label="First name" value={show(profile.firstName)} />
            <DetailRow label="Last name" value={show(profile.lastName)} />
            <DetailRow label="Date of birth" value={formatDate(profile.dob)} />
            <DetailRow label="Email" value={show(profile.email)} />
            <DetailRow label="Profession" value={show(profile.profession)} />

            <div className="flex flex-wrap gap-3">
              <Button text="Change password" variant="secondary" className="w-[200px]" onClick={() => setShowPassword(true)} />
              <Button text="Delete account" variant="danger" className="w-[170px]" onClick={() => setShowDelete(true)} />
            </div>

          </div>

        </div>
      )}

      {showPassword && (
        <ChangePasswordModal startDone={dialog === "password-changed"} onClose={() => setShowPassword(false)} />
      )}

      {showDelete && <DeleteAccountModal onClose={() => setShowDelete(false)} />}

    </UserLayout>
  )
}

// one line in the account details card: grey label on the left, value on the right
const DetailRow = ({ label, value }) => {
  return (
    <div className="flex gap-6">
      <p className="w-[180px] shrink-0 text-[12px] leading-[18px] text-muted">{label}</p>
      <p className="text-[14px] font-medium leading-5 text-ink">{value}</p>
    </div>
  )
}

export default Profile
