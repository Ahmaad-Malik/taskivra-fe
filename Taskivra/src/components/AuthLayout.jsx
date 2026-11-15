import BrandPanel from "./BrandPanel"

// page frame for login, register and password pages:
// brand panel on the left + white card on the right
// whatever is written between <AuthLayout> and </AuthLayout> goes inside the card
const AuthLayout = ({ isAdmin = false, children }) => {

  const pageStyle = {
    backgroundImage:
      "linear-gradient(144.16deg, #dee3ff 0%, #f2f7ff 35.361%, #d4f2eb 70.721%)"
  }

  return (
    <div className="flex min-h-screen" style={pageStyle}>

      <BrandPanel isAdmin={isAdmin} />

      {/* form region */}
      <div className="flex flex-1 items-center justify-center p-6 lg:bg-white lg:p-16">

        <div className="flex w-full max-w-[528px] flex-col gap-4 rounded-[20px] border border-white bg-white p-6 shadow-[0px_8px_28px_0px_rgba(41,48,102,0.08)]">
          {children}
        </div>

      </div>

    </div>
  )
}

export default AuthLayout
