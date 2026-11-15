import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import AuthLayout from "../components/AuthLayout"
import InputField from "../components/InputField"
import PasswordField from "../components/PasswordField"
import PasswordStrength from "../components/PasswordStrength"
import Button from "../components/Button"
import { checkPassword } from "../utils/password"

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [agree, setAgree] = useState(false)

  const [errors, setErrors] = useState({})

  // one handler for all the input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {

    e.preventDefault()                 // 1. stop the form from refreshing the page

    // 2. remove the extra spaces from the text fields before checking them
    const firstName = formData.firstName.trim()
    const lastName = formData.lastName.trim()
    const username = formData.username.trim()
    const email = formData.email.trim()
    const password = formData.password

    const today = new Date().toISOString().slice(0, 10)

    // 3. check the values (messages are taken from the SRS acceptance criteria)
    const newErrors = {}

    if (firstName === "") newErrors.firstName = "First name is required"
    else if (!/^[A-Za-z' -]+$/.test(firstName)) newErrors.firstName = "Please enter a valid name"

    if (lastName === "") newErrors.lastName = "Last name is required"
    else if (!/^[A-Za-z' -]+$/.test(lastName)) newErrors.lastName = "Please enter a valid name"

    if (username === "") newErrors.username = "Username is required"
    else if (!/^[A-Za-z0-9]+$/.test(username)) newErrors.username = "Please enter a valid username"

    if (formData.dob === "") newErrors.dob = "Date of birth is required"
    else if (formData.dob > today) newErrors.dob = "Please enter a valid date of birth"

    if (email === "") newErrors.email = "Email is required"
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) newErrors.email = "Please enter a valid email address"

    const passwordError = checkPassword(password, "Password")     // rules are in src/utils/password.js
    if (passwordError !== "") newErrors.password = passwordError

    if (formData.confirmPassword === "") newErrors.confirmPassword = "Confirm password is required"
    else if (formData.confirmPassword !== password) newErrors.confirmPassword = "Passwords do not match"

    if (agree === false) newErrors.agree = "Please accept the Terms of Service"

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    const user = { firstName, lastName, username, dob: formData.dob, email, password }

    // 4. When the backend is connected:
    // try {
    //   await axios.post(BASE_URL + "/auth/register", user)
    // } catch (err) {
    //   if the username is used  -> setErrors({ username: "This username is already taken." })
    //   if the email is used     -> setErrors({ email: "This email is already registered." })
    //   if the server is down    -> show "Unable to register your account. Please try again later."
    //   return
    // }

    console.log("Register data: ", { ...user, password: "hidden" })

    // 5. the backend sends a verification email, so the next page is "Check your email"
    navigate("/register/check-email?email=" + email)
  }

  return (
    <AuthLayout>

      <Button
        text="← Back"
        variant="ghost"
        onClick={() => navigate("/")}
        className="h-8 w-24"
      />

      <p className="text-[11px] font-medium leading-4 text-brand">WELCOME TO TASKIVRA</p>

      <h1 className="text-[28px] font-bold leading-9 text-ink">Create your account</h1>

      <p className="text-[14px] leading-[22px] text-muted">
        Create an account to manage tasks and AI plans.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <InputField
            label="First name *"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />

          <InputField
            label="Last name *"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <InputField
            label="Username *"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />

          <InputField
            label="Date of birth *"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            error={errors.dob}
          />

        </div>

        <InputField
          label="Email *"
          type="email"
          name="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <PasswordField
            label="Password *"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <PasswordField
            label="Confirm password *"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

        </div>

        {/* password strength */}
        <PasswordStrength password={formData.password} />

        {/* terms and conditions */}
        <div className="flex gap-3">

          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded accent-brand"
          />

          <p className="text-[12px] leading-[18px] text-muted">
            I agree to the Terms of Service and Privacy Policy.
            {errors.agree && <span className="block text-red-500">{errors.agree}</span>}
          </p>

        </div>

        <Button text="Create account" type="submit" className="w-full" />

      </form>

      <Link to="/login" className="text-[14px] leading-[22px] text-brand">
        Already have an account? Sign in →
      </Link>

    </AuthLayout>
  )
}

export default Register
