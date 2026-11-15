import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import AuthContext from './context/AuthContext'
import { PREVIEW_MODE } from './api/api'
import { demoUser, demoAdmin } from './data/demo'
import RequireUser from './components/RequireUser'
import RequireAdmin from './components/RequireAdmin'

// public pages
import Landing from './pages/Landing'
import Register from './pages/Register'
import CheckEmail from './pages/CheckEmail'
import VerifyEmail from './pages/VerifyEmail'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetEmailSent from './pages/ResetEmailSent'
import ResetPassword from './pages/ResetPassword'
import ResetSuccess from './pages/ResetSuccess'
import ResetExpired from './pages/ResetExpired'
import NotFound from './pages/NotFound'

// user pages (need a logged in user)
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import TaskDetails from './pages/TaskDetails'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import Calendar from './pages/Calendar'
import Chat from './pages/Chat'
import Plans from './pages/Plans'
import Drafts from './pages/Drafts'
import Notifications from './pages/Notifications'
import Reports from './pages/Reports'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Settings from './pages/Settings'

// admin pages (need a logged in admin)
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminUserStats from './pages/admin/AdminUserStats'
import AdminTaskStats from './pages/admin/AdminTaskStats'
import AdminActivity from './pages/admin/AdminActivity'
import AdminNotifications from './pages/admin/AdminNotifications'
import AdminDrafts from './pages/admin/AdminDrafts'
import AdminSystem from './pages/admin/AdminSystem'
import AdminProfile from './pages/admin/AdminProfile'
import AdminSettings from './pages/admin/AdminSettings'

const App = () => {

  // the logged in user and admin (null = nobody is logged in)
  // while PREVIEW_MODE is true the app starts with demo accounts so every page can be opened.
  // when the login APIs are connected, set PREVIEW_MODE to false in src/api/api.js
  const [user, setUser] = useState(PREVIEW_MODE ? demoUser : null)
  const [admin, setAdmin] = useState(PREVIEW_MODE ? demoAdmin : null)

  // "user" or "admin" right after logging out, so the login page can show "You're signed out"
  const [loggedOut, setLoggedOut] = useState("")

  return (
    <AuthContext.Provider value={{ user, setUser, admin, setAdmin, loggedOut, setLoggedOut }}>
      <Routes>

        {/* public pages */}
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/check-email' element={<CheckEmail />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/verify-email/:token' element={<VerifyEmail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/forgot-password/sent' element={<ResetEmailSent />} />
        <Route path='/reset-password/success' element={<ResetSuccess />} />
        <Route path='/reset-password/expired' element={<ResetExpired />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />

        {/* user pages */}
        <Route path='/dashboard' element={<RequireUser><Dashboard /></RequireUser>} />
        <Route path='/tasks' element={<RequireUser><Tasks /></RequireUser>} />
        <Route path='/tasks/create' element={<RequireUser><CreateTask /></RequireUser>} />
        <Route path='/tasks/edit/:id' element={<RequireUser><EditTask /></RequireUser>} />
        <Route path='/tasks/:id' element={<RequireUser><TaskDetails /></RequireUser>} />
        <Route path='/calendar' element={<RequireUser><Calendar /></RequireUser>} />
        <Route path='/chat' element={<RequireUser><Chat /></RequireUser>} />
        <Route path='/plans' element={<RequireUser><Plans /></RequireUser>} />
        <Route path='/drafts' element={<RequireUser><Drafts /></RequireUser>} />
        <Route path='/notifications' element={<RequireUser><Notifications /></RequireUser>} />
        <Route path='/reports' element={<RequireUser><Reports /></RequireUser>} />
        <Route path='/profile' element={<RequireUser><Profile /></RequireUser>} />
        <Route path='/profile/edit' element={<RequireUser><EditProfile /></RequireUser>} />
        <Route path='/settings' element={<RequireUser><Settings /></RequireUser>} />

        {/* admin public pages */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/forgot-password' element={<ForgotPassword isAdmin={true} />} />
        <Route path='/admin/forgot-password/sent' element={<ResetEmailSent isAdmin={true} />} />
        <Route path='/admin/reset-password/success' element={<ResetSuccess isAdmin={true} />} />
        <Route path='/admin/reset-password/expired' element={<ResetExpired isAdmin={true} />} />
        <Route path='/admin/reset-password/:token' element={<ResetPassword isAdmin={true} />} />

        {/* admin pages */}
        <Route path='/admin/dashboard' element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
        <Route path='/admin/users' element={<RequireAdmin><AdminUsers /></RequireAdmin>} />
        <Route path='/admin/user-stats' element={<RequireAdmin><AdminUserStats /></RequireAdmin>} />
        <Route path='/admin/task-stats' element={<RequireAdmin><AdminTaskStats /></RequireAdmin>} />
        <Route path='/admin/activity' element={<RequireAdmin><AdminActivity /></RequireAdmin>} />
        <Route path='/admin/notifications' element={<RequireAdmin><AdminNotifications /></RequireAdmin>} />
        <Route path='/admin/drafts' element={<RequireAdmin><AdminDrafts /></RequireAdmin>} />
        <Route path='/admin/system' element={<RequireAdmin><AdminSystem /></RequireAdmin>} />
        <Route path='/admin/profile' element={<RequireAdmin><AdminProfile /></RequireAdmin>} />
        <Route path='/admin/settings' element={<RequireAdmin><AdminSettings /></RequireAdmin>} />

        {/* 404 page */}
        <Route path='*' element={<NotFound />} />

      </Routes>
    </AuthContext.Provider>
  )
}

export default App
