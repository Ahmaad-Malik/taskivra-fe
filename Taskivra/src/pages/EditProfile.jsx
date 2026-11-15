import { useContext, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import AuthContext from "../context/AuthContext"
import UserLayout from "../components/UserLayout"
import InputField from "../components/InputField"
import SelectField from "../components/SelectField"
import Button from "../components/Button"
import Notice from "../components/Notice"
import Modal from "../components/Modal"

const professions = ["Student", "Employee", "Freelancer", "Other"]

const EditProfile = () => {

  const navigate = useNavigate()

  const { user, setUser } = useContext(AuthContext)

  // preview from the url: /profile/edit?dialog=saved | error | unsaved
  const [searchParams] = useSearchParams()
  const dialog = searchParams.get("dialog")

  // the form starts with the values that are saved now
  const [formData, setFormData] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    profession: user.profession
  })

  const [errors, setErrors] = useState({})

  const [showSaved, setShowSaved] = useState(dialog === "saved")       // "Profile updated"
  const [showError, setShowError] = useState(dialog === "error")       // "Profile update failed"
  const [showUnsaved, setShowUnsaved] = useState(dialog === "unsaved") // "Discard profile changes?"

  // true when the user changed something that is not saved yet
  const hasChanges =
    formData.username !== user.username ||
    formData.firstName !== user.firstName ||
    formData.lastName !== user.lastName ||
    formData.dob !== user.dob ||
    formData.profession !== user.profession

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Back and Cancel: warn first if there are unsaved changes (SRS US-06)
  const leavePage = () => {
    if (hasChanges) setShowUnsaved(true)
    else navigate("/profile")
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    // 1. remove the extra spaces
    const username = formData.username.trim()
    const firstName = formData.firstName.trim()
    const lastName = formData.lastName.trim()

    const today = new Date().toISOString().slice(0, 10)

    // 2. check the values (messages from the SRS US-06)
    const newErrors = {}

    if (username === "") newErrors.username = "Username is required"
    else if (!/^[A-Za-z0-9]+$/.test(username)) newErrors.username = "Username can only contain letters and numbers"

    if (firstName === "") newErrors.firstName = "First name is required"
    else if (!/^[A-Za-z' -]+$/.test(firstName)) newErrors.firstName = "Please enter a valid name"

    if (lastName === "") newErrors.lastName = "Last name is required"
    else if (!/^[A-Za-z' -]+$/.test(lastName)) newErrors.lastName = "Please enter a valid name"

    if (formData.dob === "") newErrors.dob = "Date of birth is required"
    else if (formData.dob > today) newErrors.dob = "Please enter a valid date of birth"

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    const updatedProfile = { username, firstName, lastName, dob: formData.dob, profession: formData.profession }

    // 3. When the backend is connected:
    // try {
    //   const response = await axios.put(BASE_URL + "/users/me", updatedProfile, {
    //     headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    //   })
    //   setUser(response.data)
    // } catch (err) {
    //   if the username is used by someone else -> setErrors({ username: "This username is already taken" })
    //   otherwise -> setShowError(true)
    //   return
    // }

    // 4. save the new values in the app and show the success popup
    setUser({ ...user, ...updatedProfile })
    setFormData(updatedProfile)
    setShowSaved(true)
  }

  return (
    <UserLayout active="profile" breadcrumb="Workspace / Edit your profile">

      <Button text="← Back" variant="ghost" className="h-8 w-24" onClick={leavePage} />

      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold leading-9 text-ink">Edit your profile</h1>
        <p className="text-[14px] leading-[22px] text-muted">Keep your personal information up to date.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[800px] flex-col gap-4 rounded-2xl border border-white bg-white/66 p-6 shadow-[0px_8px_28px_0px_rgba(41,48,102,0.08)]"
      >

        <InputField
          label="Username *"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            label="First name *"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <InputField
            label="Last name *"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            label="Date of birth"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            error={errors.dob}
          />
          <SelectField
            label="Profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            options={professions}
          />
        </div>

        <Notice type="info" title="Email is managed separately" body={"Your account email: " + user.email} />

        <div className="flex gap-3">
          <Button text="Save changes" type="submit" className="w-[170px]" />
          <Button text="Cancel" variant="secondary" className="w-[120px]" onClick={leavePage} />
        </div>

      </form>

      {/* popup: saved */}
      {showSaved && (
        <Modal title="Profile updated" body="Your changes were saved successfully." onBack={() => setShowSaved(false)}>
          <Notice type="success" title="Success" body="Profile updated successfully" />
          <Button text="View profile" className="w-full" onClick={() => navigate("/profile")} />
        </Modal>
      )}

      {/* popup: saving failed */}
      {showError && (
        <Modal title="Profile update failed" body="We couldn’t save your changes. Please try again.">
          <Notice type="error" title="Action needed" body="Unable to update profile. Please try again." />
          <Button text="Return and retry" className="w-full" onClick={() => setShowError(false)} />
        </Modal>
      )}

      {/* popup: leaving with unsaved changes */}
      {showUnsaved && (
        <Modal title="Discard profile changes?" body="Your unsaved profile edits will be lost.">
          <div className="flex w-full gap-3">
            <Button text="Cancel" variant="secondary" className="w-[180px]" onClick={() => setShowUnsaved(false)} />
            <Button text="Discard changes" variant="danger" className="flex-1" onClick={() => navigate("/profile")} />
          </div>
        </Modal>
      )}

    </UserLayout>
  )
}

export default EditProfile
