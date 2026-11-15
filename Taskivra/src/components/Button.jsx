// variant:
// "primary"   purple button
// "secondary" white card button
// "ghost"     white button with purple text
// "danger"    red button (delete)
const Button = ({ text, onClick, type = "button", variant = "primary", disabled = false, className = "" }) => {

  let styleClasses = "bg-brand text-white"

  if (variant === "ghost") styleClasses = "bg-white text-brand"

  if (variant === "danger") styleClasses = "bg-red text-white"

  if (variant === "secondary") {
    styleClasses = "bg-white text-ink border border-white shadow-[0px_8px_28px_0px_rgba(41,48,102,0.08)]"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        "flex h-11 items-center justify-center gap-2 rounded-lg p-3 text-[14px] font-medium leading-5 disabled:opacity-60 " +
        styleClasses + " " + className
      }
    >
      {text}
    </button>
  )
}

export default Button
