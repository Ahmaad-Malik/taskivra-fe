// small green label, for example "Active"
const Badge = ({ text }) => {
  return (
    <div className="flex h-7 w-fit items-center justify-center rounded-lg bg-tealsoft px-2 text-[11px] font-medium leading-4 text-teal">
      {text}
    </div>
  )
}

export default Badge
