import AdminLayout from "../../components/AdminLayout"

// this page is built in a later sprint
// (changing the admin password is on the Admin Profile page)
const AdminSettings = () => {
  return (
    <AdminLayout active="settings" breadcrumb="Administration / Admin settings">
      <h1 className="text-[28px] font-bold leading-9 text-ink">Admin settings</h1>
      <p className="text-[14px] leading-[22px] text-muted">This page is coming in a later sprint.</p>
    </AdminLayout>
  )
}

export default AdminSettings
