// password rules from the SRS (used on register, reset password and change password)
// 8 to 20 characters, one uppercase, one lowercase, one digit, one special character

// counts how many of the 5 rules the password passes
export const getPasswordPoints = (password) => {

  let points = 0

  if (password.length >= 8 && password.length <= 20) points = points + 1
  if (/[A-Z]/.test(password)) points = points + 1
  if (/[a-z]/.test(password)) points = points + 1
  if (/[0-9]/.test(password)) points = points + 1
  if (/[^A-Za-z0-9]/.test(password)) points = points + 1

  return points
}

// returns the first rule that is not passed, or "" when the password is fine
// fieldName is used in the "is required" message, for example "New Password"
export const checkPassword = (password, fieldName) => {

  if (password === "") return fieldName + " is required"

  if (password.length < 8) return "Password must be at least 8 characters"

  if (password.length > 20) return "Password must not be more than 20 characters"

  if (!/[A-Z]/.test(password)) return "Password must contain one uppercase letter"

  if (!/[a-z]/.test(password)) return "Password must contain one lowercase letter"

  if (!/[0-9]/.test(password)) return "Password must contain one digit"

  if (!/[^A-Za-z0-9]/.test(password)) return "Password must contain one special character"

  return ""
}
