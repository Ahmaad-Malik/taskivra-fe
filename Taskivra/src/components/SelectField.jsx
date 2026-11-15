// dropdown that looks the same as InputField
// options = array of text, for example ["Student", "Employee"]
const SelectField = ({ label, name, value, onChange, options, error }) => {
  return (
    <div className="flex w-full flex-col gap-1.5">

      <label className="text-[14px] font-medium leading-5 text-ink">{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={
          "h-11 w-full rounded-lg border bg-white px-3 text-[14px] leading-[22px] text-ink outline-none focus:border-brand " +
          (error ? "border-red-500" : "border-line")
        }
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <p className="h-[18px] text-[12px] leading-[18px] text-red-500">{error}</p>

    </div>
  )
}

export default SelectField
