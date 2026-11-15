import { useState } from "react"
import iconEye from "../assets/icon-eye.svg"

// password input with the eye icon to show / hide the password
// help = grey hint text under the field (shown when there is no error)
const PasswordField = ({ label, name, value, onChange, error, placeholder = "••••••••••••", help = "" }) => {

  const [show, setShow] = useState(false)

  return (
    <div className="flex w-full flex-col gap-1.5">

      <label className="text-[14px] font-medium leading-5 text-ink">{label}</label>

      <div
        className={
          "flex h-11 w-full items-center gap-2 rounded-lg border bg-white p-3 " +
          (error ? "border-red-500" : "border-line")
        }
      >
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="min-w-0 flex-1 text-[14px] leading-[22px] text-ink outline-none placeholder:text-muted"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="flex items-center gap-1 text-[12px] leading-[18px] text-muted"
        >
          <img src={iconEye} alt="" className="h-4 w-4" />
          {show ? "Hide" : "Show"}
        </button>
      </div>

      {/* red error, or the grey hint when there is no error */}
      <p className={"min-h-[18px] text-[12px] leading-[18px] " + (error ? "text-red-500" : "text-muted")}>
        {error ? error : help}
      </p>

    </div>
  )
}

export default PasswordField
