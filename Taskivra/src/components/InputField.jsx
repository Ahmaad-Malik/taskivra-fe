const InputField = ({ label, type = "text", name, value, placeholder, onChange, error }) => {
  return (
    <div className="flex w-full flex-col gap-1.5">

      <label className="text-[14px] font-medium leading-5 text-ink">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={
          "h-11 w-full rounded-lg border bg-white p-3 text-[14px] leading-[22px] text-ink outline-none placeholder:text-muted focus:border-brand " +
          (error ? "border-red-500" : "border-line")
        }
      />

      {/* helper line, shows the validation message */}
      <p className="h-[18px] text-[12px] leading-[18px] text-red-500">{error}</p>

    </div>
  )
}

export default InputField
