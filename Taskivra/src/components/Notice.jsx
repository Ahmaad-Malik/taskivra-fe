// message box used inside pages and popups
// type: "success" (green), "error" (red), "warning" (yellow) or "info" (purple)
const Notice = ({ title, body, type = "success" }) => {

  let colors = "bg-tealsoft text-teal"

  if (type === "error") colors = "bg-redsoft text-red"

  if (type === "warning") colors = "bg-ambersoft text-amber"

  if (type === "info") colors = "bg-brandsoft text-brand"

  return (
    <div className={"flex w-full flex-col gap-1 rounded-lg p-4 " + colors}>
      <p className="text-[14px] font-medium leading-5">{title}</p>
      <p className="text-[12px] leading-[18px]">{body}</p>
    </div>
  )
}

export default Notice
