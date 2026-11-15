import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import AuthContext from "../context/AuthContext"
import Modal from "./Modal"
import Notice from "./Notice"
import Button from "./Button"
import InputField from "./InputField"
import PasswordField from "./PasswordField"
import Skeleton from "./Skeleton"

// "Delete your account?" popup, used on the profile and settings pages
// it has 3 steps: "confirm" (the form), "deleting" (loading) and "deleted" (success)
// startStep is only used to preview a step from the url
const DeleteAccountModal = ({ startStep = "confirm", onClose }) => {

  const navigate = useNavigate()

  const { setUser } = useContext(AuthContext)

  const [step, setStep] = useState(startStep)

  const [formData, setFormData] = useState({
    confirmText: "",
    password: ""
  })

  const [errors, setErrors] = useState({})

  const [serverError] = useState("")   // add setServerError back when the API is connected

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    const newErrors = {}

    if (formData.confirmText !== "DELETE") newErrors.confirmText = "Please type DELETE to confirm"

    if (formData.password === "") newErrors.password = "Password is required"

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    // When the backend is connected:
    // setStep("deleting")
    // try {
    //   await axios.delete(BASE_URL + "/users/me", { data: { password: formData.password } })
    // } catch (err) {
    //   setStep("confirm")
    //   if the password is wrong -> setErrors({ password: "Incorrect password. Account deletion was not completed" })
    //   otherwise -> setServerError("Unable to delete your account. Please try again later.")
    //   return
    // }

    setStep("deleted")
  }

  // the account is gone: remove the login and go to the login page
  const returnToSignIn = () => {
    localStorage.removeItem("token")
    navigate("/login")
    setUser(null)
  }

  // step 2: loading
  if (step === "deleting") {
    return (
      <Modal title="Deleting your account" body="Removing your account data and ending your session…">
        <Skeleton />
        <Skeleton />
        <Button text="Continue" variant="secondary" disabled={true} className="w-full" />
      </Modal>
    )
  }

  // step 3: success
  if (step === "deleted") {
    return (
      <Modal title="Account deleted" body="Your data has been removed and your session has ended.">
        <Notice type="success" title="Success" body="Your account has been deleted successfully" />
        <Button text="Return to sign in" className="w-full" onClick={returnToSignIn} />
      </Modal>
    )
  }

  // step 1: the form
  return (
    <Modal
      title="Delete your account?"
      body="This permanently deletes your tasks, drafts, plans, notifications and reports. This action cannot be undone."
    >
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">

        {serverError !== "" && <Notice type="error" title="Action needed" body={serverError} />}

        <InputField
          label="Type DELETE to confirm *"
          name="confirmText"
          placeholder="DELETE"
          value={formData.confirmText}
          onChange={handleChange}
          error={errors.confirmText}
        />

        <PasswordField
          label="Current Password *"
          name="password"
          placeholder="Enter Current Password"
          help="Required to confirm it’s you. Passwords are masked by default."
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="flex w-full gap-3">
          <Button text="Cancel" variant="secondary" className="w-[180px]" onClick={onClose} />
          <Button text="Delete my account" type="submit" variant="danger" className="flex-1" />
        </div>

      </form>
    </Modal>
  )
}

export default DeleteAccountModal
