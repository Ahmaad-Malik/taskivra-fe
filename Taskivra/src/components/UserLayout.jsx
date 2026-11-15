import { useContext, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

import AuthContext from "../context/AuthContext"
import TopBar from "./TopBar"
import Notice from "./Notice"
import Modal from "./Modal"
import Button from "./Button"

import dashboardIcon from "../assets/icons/dashboard.svg"
import tasksIcon from "../assets/icons/tasks.svg"
import calendarIcon from "../assets/icons/calendar.svg"
import assistantIcon from "../assets/icons/assistant.svg"
import plansIcon from "../assets/icons/plans.svg"
import draftsIcon from "../assets/icons/drafts.svg"
import notificationsIcon from "../assets/icons/notifications.svg"
import reportsIcon from "../assets/icons/reports.svg"
import profileIcon from "../assets/icons/profile.svg"
import settingsIcon from "../assets/icons/settings.svg"

// all the links in the left menu
const links = [
  { name: "dashboard", label: "Dashboard", path: "/dashboard", icon: dashboardIcon },
  { name: "tasks", label: "Tasks", path: "/tasks", icon: tasksIcon },
  { name: "calendar", label: "Calendar", path: "/calendar", icon: calendarIcon },
  { name: "assistant", label: "AI Assistant", path: "/chat", icon: assistantIcon },
  { name: "plans", label: "AI Plans", path: "/plans", icon: plansIcon },
  { name: "drafts", label: "Drafts", path: "/drafts", icon: draftsIcon },
  { name: "notifications", label: "Notifications", path: "/notifications", icon: notificationsIcon },
  { name: "reports", label: "Reports", path: "/reports", icon: reportsIcon },
  { name: "profile", label: "Profile", path: "/profile", icon: profileIcon },
  { name: "settings", label: "Settings", path: "/settings", icon: settingsIcon }
]

// page frame for the logged in user: left menu + top bar + page content
// active = name of the menu link to highlight
// breadcrumb = small text in the top bar
const UserLayout = ({ active, breadcrumb, children }) => {

  const navigate = useNavigate()

  const { user, setUser, setLoggedOut } = useContext(AuthContext)

  // ?dialog=access-denied or ?dialog=session-expired opens those popups on any page.
  // When the backend is connected, a 403 response will navigate to "?dialog=access-denied"
  // and a 401 response (token expired) will navigate to "?dialog=session-expired".
  const [searchParams] = useSearchParams()
  const dialog = searchParams.get("dialog")

  const [showMenu, setShowMenu] = useState(false)       // account popup (top right "Profile" button)
  const [showLogout, setShowLogout] = useState(false)   // "Log out of Taskivra?" popup

  const initials = user.firstName[0] + user.lastName[0]

  const openLogout = () => {
    setShowMenu(false)
    setShowLogout(true)
  }

  const confirmLogout = () => {

    // When the backend is connected:
    // try {
    //   await axios.post(BASE_URL + "/auth/logout")
    // } catch (err) {
    //   show "Unable to complete logout. Please try again."
    //   (the saved token is still removed below, the SRS asks for that)
    // }

    localStorage.removeItem("token")      // remove the saved login token from the browser

    setShowLogout(false)

    setLoggedOut("user")                  // the login page shows the "You're signed out" popup

    setUser(null)                         // no user is logged in anymore,
                                          // RequireUser now sends the page to /login
  }

  // session expired: forget the user and go to the login page
  const signInAgain = () => {
    localStorage.removeItem("token")
    navigate("/login")
    setUser(null)
  }

  const pageStyle = {
    backgroundImage:
      "linear-gradient(143.13deg, #dee3ff 0%, #f2f7ff 35.361%, #d4f2eb 70.721%)"
  }

  return (
    <div className="flex min-h-screen" style={pageStyle}>

      {/* left menu */}
      <div className="sticky top-0 flex h-screen w-[232px] shrink-0 flex-col gap-2 overflow-y-auto border border-white bg-white/72 p-5 backdrop-blur-[10px] shadow-[0px_8px_28px_0px_rgba(41,48,102,0.08)]">

        <p className="text-[20px] font-semibold leading-7 text-brand">◈&nbsp;&nbsp;Taskivra</p>

        <p className="text-[11px] font-medium leading-4 text-muted">YOUR WORKSPACE</p>

        <div className="h-px w-full bg-line" />

        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={
              "flex items-center gap-2 rounded-lg p-3 text-[14px] font-medium leading-5 " +
              (active === link.name ? "bg-brandsoft text-brand" : "text-muted")
            }
          >
            <img src={link.icon} alt="" className="h-5 w-5" />
            {link.label}
          </Link>
        ))}

        {/* empty space that pushes the rest to the bottom */}
        <div className="flex-1" />

        <Notice type="info" title="AI task drafts" body="Review every draft before it becomes a task." />

        <p className="text-[14px] font-medium leading-5 text-ink">
          {initials}&nbsp;&nbsp;{user.firstName} {user.lastName}
        </p>

        <button type="button" onClick={openLogout} className="text-left text-[12px] leading-[18px] text-muted">
          Log out ↗
        </button>

      </div>

      {/* right side */}
      <div className="flex min-w-0 flex-1 flex-col">

        <TopBar
          breadcrumb={breadcrumb}
          searchPlaceholder="Search tasks…"
          notificationsPath="/notifications"
          onProfileClick={() => setShowMenu(true)}
        />

        <div className="flex flex-col gap-6 p-8">
          {children}
        </div>

      </div>

      {/* popup: account menu */}
      {showMenu && (
        <Modal title={user.firstName + " " + user.lastName} body={user.email} onBack={() => setShowMenu(false)}>
          <Button text="My profile" variant="secondary" className="w-full" onClick={() => navigate("/profile")} />
          <Button text="Settings" variant="secondary" className="w-full" onClick={() => navigate("/settings")} />
          <Button text="Log out" variant="secondary" className="w-full" onClick={openLogout} />
        </Modal>
      )}

      {/* popup: log out */}
      {showLogout && (
        <Modal title="Log out of Taskivra?" body="Your saved work will be here when you return.">
          <div className="flex w-full gap-3">
            <Button text="Cancel" variant="secondary" className="w-[180px]" onClick={() => setShowLogout(false)} />
            <Button text="Confirm logout" className="flex-1" onClick={confirmLogout} />
          </div>
        </Modal>
      )}

      {/* popup: user tried to open data that belongs to someone else */}
      {dialog === "access-denied" && (
        <Modal title="This workspace is private" body="You can only access your own tasks, drafts, plans and notifications.">
          <Notice type="warning" title="Access denied" body="You can only access your own tasks, drafts, plans and notifications." />
          <Button text="Return and retry" className="w-full" onClick={() => navigate("/dashboard")} />
        </Modal>
      )}

      {/* popup: login token expired */}
      {dialog === "session-expired" && (
        <Modal title="Your session has expired" body="Sign in again to continue. Your saved work is safe.">
          <Notice type="error" title="Action needed" body="Sign in again to continue. Your saved work is safe." />
          <Button text="Sign in again" className="w-full" onClick={signInAgain} />
        </Modal>
      )}

    </div>
  )
}

export default UserLayout
