import { useContext, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

import AuthContext from "../context/AuthContext"
import TopBar from "./TopBar"
import Notice from "./Notice"
import Modal from "./Modal"
import Button from "./Button"

import dashboardIcon from "../assets/icons/admin-dashboard.svg"
import usersIcon from "../assets/icons/admin-users.svg"
import tasksIcon from "../assets/icons/admin-tasks.svg"
import reportsIcon from "../assets/icons/admin-reports.svg"
import notificationsIcon from "../assets/icons/admin-notifications.svg"
import draftsIcon from "../assets/icons/admin-drafts.svg"
import statusIcon from "../assets/icons/admin-status.svg"
import profileIcon from "../assets/icons/admin-profile.svg"
import settingsIcon from "../assets/icons/admin-settings.svg"

// all the links in the admin left menu
const links = [
  { name: "dashboard", label: "Dashboard", path: "/admin/dashboard", icon: dashboardIcon },
  { name: "users", label: "Users", path: "/admin/users", icon: usersIcon },
  { name: "user-stats", label: "User Statistics", path: "/admin/user-stats", icon: usersIcon },
  { name: "task-stats", label: "Task Statistics", path: "/admin/task-stats", icon: tasksIcon },
  { name: "activity", label: "Activity Statistics", path: "/admin/activity", icon: reportsIcon },
  { name: "notifications", label: "Notification Statistics", path: "/admin/notifications", icon: notificationsIcon },
  { name: "drafts", label: "Auto-Draft Statistics", path: "/admin/drafts", icon: draftsIcon },
  { name: "system", label: "System Status", path: "/admin/system", icon: statusIcon },
  { name: "profile", label: "Admin Profile", path: "/admin/profile", icon: profileIcon },
  { name: "settings", label: "Settings", path: "/admin/settings", icon: settingsIcon }
]

// page frame for the admin: dark left menu + top bar + page content
const AdminLayout = ({ active, breadcrumb, children }) => {

  const navigate = useNavigate()

  const { admin, setAdmin, setLoggedOut } = useContext(AuthContext)

  // ?dialog=access-denied or ?dialog=session-expired opens those popups on any admin page.
  // When the backend is connected, a 403 response will navigate to "?dialog=access-denied"
  // and a 401 response will navigate to "?dialog=session-expired".
  const [searchParams] = useSearchParams()
  const dialog = searchParams.get("dialog")

  const [showMenu, setShowMenu] = useState(false)       // account popup
  const [showLogout, setShowLogout] = useState(false)   // "End your admin session?" popup

  const openLogout = () => {
    setShowMenu(false)
    setShowLogout(true)
  }

  const confirmLogout = () => {

    // When the backend is connected:
    // try {
    //   await axios.post(BASE_URL + "/admin/logout")
    // } catch (err) {
    //   show "Unable to complete logout. Please try again"
    //   (the saved token is still removed below, the SRS asks for that)
    // }

    localStorage.removeItem("adminToken")       // remove the saved admin token from the browser

    setShowLogout(false)

    setLoggedOut("admin")                       // admin login page shows "Admin session ended"

    setAdmin(null)                              // no admin is logged in anymore,
                                                // RequireAdmin now sends the page to /admin/login
  }

  // admin session expired: forget the admin and go to the admin login page
  const signInAgain = () => {
    localStorage.removeItem("adminToken")
    navigate("/admin/login")
    setAdmin(null)
  }

  const pageStyle = {
    backgroundImage:
      "linear-gradient(143.13deg, #dee3ff 0%, #f2f7ff 35.361%, #d4f2eb 70.721%)"
  }

  return (
    <div className="flex min-h-screen" style={pageStyle}>

      {/* left menu */}
      <div className="sticky top-0 flex h-screen w-[232px] shrink-0 flex-col gap-2 overflow-y-auto border border-white bg-night p-5 shadow-[0px_8px_28px_0px_rgba(41,48,102,0.18)]">

        <p className="text-[20px] font-semibold leading-7 text-white">◈&nbsp;&nbsp;Taskivra</p>

        <p className="text-[11px] font-medium leading-4 text-whitemuted">ADMIN CONSOLE</p>

        <div className="h-px w-full bg-line" />

        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={
              "flex items-center gap-2 rounded-lg p-3 text-[14px] font-medium leading-5 text-white " +
              (active === link.name ? "bg-white/10" : "")
            }
          >
            <img src={link.icon} alt="" className="h-5 w-5" />
            {link.label}
          </Link>
        ))}

        {/* empty space that pushes the rest to the bottom */}
        <div className="flex-1" />

        <Notice type="info" title="Privacy by design" body="Account data and aggregate metrics only." />

        <p className="text-[14px] font-medium leading-5 text-white">SA&nbsp;&nbsp;{admin.name}</p>

        <button type="button" onClick={openLogout} className="text-left text-[12px] leading-[18px] text-whitemuted">
          Log out ↗
        </button>

      </div>

      {/* right side */}
      <div className="flex min-w-0 flex-1 flex-col">

        <TopBar
          breadcrumb={breadcrumb}
          searchPlaceholder="Search users…"
          notificationsPath="/admin/notifications"
          onProfileClick={() => setShowMenu(true)}
        />

        <div className="flex flex-col gap-6 p-8">
          {children}
        </div>

      </div>

      {/* popup: account menu */}
      {showMenu && (
        <Modal title={admin.name} body={admin.email} onBack={() => setShowMenu(false)}>
          <Button text="Admin profile" variant="secondary" className="w-full" onClick={() => navigate("/admin/profile")} />
          <Button text="Settings" variant="secondary" className="w-full" onClick={() => navigate("/admin/settings")} />
          <Button text="Log out" variant="secondary" className="w-full" onClick={openLogout} />
        </Modal>
      )}

      {/* popup: log out */}
      {showLogout && (
        <Modal title="End your admin session?" body="You will return to the administrator sign-in screen.">
          <div className="flex w-full gap-3">
            <Button text="Cancel" variant="secondary" className="w-[180px]" onClick={() => setShowLogout(false)} />
            <Button text="Confirm logout" className="flex-1" onClick={confirmLogout} />
          </div>
        </Modal>
      )}

      {/* popup: admin tried to open private user content */}
      {dialog === "access-denied" && (
        <Modal
          title="Private content is restricted"
          body="Administrators manage accounts and aggregate statistics. User tasks, drafts, plans and messages remain private."
        >
          <Notice type="warning" title="Access denied" body="You do not have permission to access this information" />
          <Button text="Return and retry" className="w-full" onClick={() => navigate("/admin/dashboard")} />
        </Modal>
      )}

      {/* popup: admin token expired */}
      {dialog === "session-expired" && (
        <Modal title="Admin session expired" body="Sign in again to resume authorized system administration.">
          <Notice type="error" title="Action needed" body="Sign in again to resume authorized system administration." />
          <Button text="Sign in again" className="w-full" onClick={signInAgain} />
        </Modal>
      )}

    </div>
  )
}

export default AdminLayout
