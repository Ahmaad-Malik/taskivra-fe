import { Link } from "react-router-dom"
import searchIcon from "../assets/icons/search.svg"
import notificationsIcon from "../assets/icons/notifications.svg"
import profileIcon from "../assets/icons/profile.svg"

// white bar at the top of the user and admin pages
const TopBar = ({ breadcrumb, searchPlaceholder, notificationsPath, onProfileClick }) => {

  const controlClasses =
    "flex h-11 items-center gap-2.5 rounded-[10px] border border-line bg-white p-3 shadow-[0px_8px_28px_0px_rgba(41,48,102,0.08)]"

  return (
    <div className="sticky top-0 z-10 flex h-[76px] items-center gap-4 border border-white bg-white/72 px-6 py-4 backdrop-blur-[10px] shadow-[0px_8px_28px_0px_rgba(41,48,102,0.08)]">

      <p className="flex-1 text-[12px] leading-[18px] text-muted">{breadcrumb}</p>

      {/* search (it will work in a later sprint) */}
      <div className={"hidden w-[320px] md:flex " + controlClasses}>
        <img src={searchIcon} alt="" className="h-5 w-5" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="min-w-0 flex-1 text-[12px] leading-[18px] text-ink outline-none placeholder:text-muted"
        />
      </div>

      <Link to={notificationsPath} className={"hidden w-[168px] sm:flex " + controlClasses}>
        <img src={notificationsIcon} alt="" className="h-5 w-5" />
        <p className="text-[12px] leading-[18px] text-muted">Notifications 3</p>
      </Link>

      <button type="button" onClick={onProfileClick} className={"w-[120px] " + controlClasses}>
        <img src={profileIcon} alt="" className="h-5 w-5" />
        <p className="text-[12px] leading-[18px] text-muted">Profile</p>
      </button>

    </div>
  )
}

export default TopBar
