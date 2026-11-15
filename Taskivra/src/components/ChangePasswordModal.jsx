import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Modal from "./Modal"
import Notice from "./Notice"
import Button from "./Button"
import PasswordField from "./PasswordField"
import PasswordStrength from "./PasswordStrength"
import { checkPassword } from "../utils/password"

// "Change password" popup, used on the profile and settings pages
// isAdmin = true is the administrator version (admin profile page)
// startDone = true opens it directly on the "Password changed" message (for previewing)
// onClose = function from the parent page that hides the popup
const ChangePasswordModal = ({ isAdmin = false, startDone = false, onClose }) => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({})

  const [serverError] = useState("")   // add setServerError back when the API is connected

  const [done, setDone] = useState(startDone)   // true = show the success message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    // check the values (messages from the SRS US-07 / US-54)
    const newErrors = {}

    if (formData.currentPassword === "") newErrors.currentPassword = "Current Password is required"

    const newPasswordError = checkPassword(formData.newPassword, "New Password")

    if (newPasswordError !== "") newErrors.newPassword = newPasswordError
    else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = "New password must be different from the current password."
    }

    if (formData.confirmPassword === "") newErrors.confirmPassword = "Confirm New Password is required"
    else if (formData.confirmPassword !== formData.newPassword) newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    // When the backend is connected:
    // try {
    //   await axios.put(BASE_URL + (isAdmin ? "/admin" : "/users/me") + "/password", {
    //     currentPassword: formData.currentPassword,
    //     newPassword: formData.newPassword
    //   })
    // } catch (err) {
    //   if the current password is wrong -> setErrors({ currentPassword: "Current password is incorrect" })
    //   otherwise -> setServerError("Unable to change password. Please try again.")
    //   return
    // }
    // (if the backend ends the session after a password change, send the user to the login page here)

    // clear the password fields and show the success message
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setDone(true)
  }

  // success message
  if (done) {
    return (
      <Modal
        title={isAdmin ? "Admin password changed" : "Password changed"}
        body={isAdmin ? "Your administrator password was updated successfully." : "Your password has been updated securely."}
        onBack={isAdmin ? onClose : undefined}
      >
        <Notice
          type="success"
          title="Success"
          body={isAdmin ? "Administrator password changed successfully" : "Password changed successfully"}
        />
        <Button
          text={isAdmin ? "Admin profile" : "Back to profile"}
          className="w-full"
          onClick={() => {
            onClose()
            navigate(isAdmin ? "/admin/profile" : "/profile")
          }}
        />
      </Modal>
    )
  }

  // the form
  return (
    <Modal
      title={isAdmin ? "Change administrator password" : "Change password"}
      body="Use a unique password to protect your account."
    >
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">

        {serverError !== "" && <Notice type="error" title="Action needed" body={serverError} />}

        <PasswordField
          label="Current password *"
          name="currentPassword"
          placeholder="Enter Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
        />

        <PasswordField
          label="New password *"
          name="newPassword"
          placeholder="Enter New Password"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />

        <PasswordStrength password={formData.newPassword} />

        <PasswordField
          label="Confirm new password *"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <div className="flex w-full gap-3">
          <Button text="Cancel" variant="secondary" className="w-[180px]" onClick={onClose} />
          <Button text="Change password" type="submit" className="flex-1" />
        </div>

      </form>
    </Modal>
  )
}

export default ChangePasswordModal
