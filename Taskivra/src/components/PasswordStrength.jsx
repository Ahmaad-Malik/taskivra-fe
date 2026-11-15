import ProgressBar from "./ProgressBar"
import { getPasswordPoints } from "../utils/password"

// green / yellow / red bar under a new password field
const PasswordStrength = ({ password }) => {

  const points = getPasswordPoints(password)

  let text = "Weak"
  let barColor = "bg-red-500"
  let textColor = "text-red-500"

  if (password === "") {
    text = "Password rules"         // nothing typed yet, so the text is grey
    barColor = "bg-teal"
    textColor = "text-muted"
  } else if (points === 5) {
    text = "Strong"
    barColor = "bg-teal"
    textColor = "text-teal"
  } else if (points >= 3) {
    text = "Medium"
    barColor = "bg-amber-500"
    textColor = "text-amber-500"
  }

  return (
    <div className="flex w-full flex-col gap-4">

      <ProgressBar value={points * 20} color={barColor} />

      <p className={"text-[12px] leading-[18px] " + textColor}>
        {text} · 8–20 characters · Uppercase · Lowercase · Digit · Special character
      </p>

    </div>
  )
}

export default PasswordStrength
