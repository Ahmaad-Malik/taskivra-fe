import ProgressBar from "./ProgressBar"

// left side purple/green panel on the login, register and password pages
// isAdmin = true shows the administrator version of the text
const BrandPanel = ({ isAdmin = false }) => {

  const panelStyle = {
    backgroundImage:
      "linear-gradient(118.3deg, #171f47 0%, #26295c 38.897%, #12404a 70.721%)"
  }

  return (
    <div
      className="hidden w-[560px] shrink-0 flex-col gap-8 p-14 lg:flex"
      style={panelStyle}
    >

      <p className="text-[20px] font-semibold leading-7 text-white">◈&nbsp;&nbsp;Taskivra</p>

      <p className="text-[11px] font-medium leading-4 text-whitemuted">
        {isAdmin ? "ADMINISTRATION" : "SMART TASK ASSISTANT"}
      </p>

      {/* empty space, same as the design */}
      <div className="h-[110px]" />

      {isAdmin ? (
        <h1 className="text-[40px] font-bold leading-[48px] text-white">
          A clear view.
          <br />
          A healthier system.
        </h1>
      ) : (
        <h1 className="text-[40px] font-bold leading-[48px] text-white">
          Manage tasks.
          <br />
          Plan with AI.
        </h1>
      )}

      <p className="text-[14px] leading-[22px] text-white">
        {isAdmin
          ? "Manage accounts and monitor your system with confidence."
          : "Plan your day, turn ideas into action, and make room for what matters."}
      </p>

      {/* product preview card */}
      <div className="flex w-[448px] flex-col gap-4 rounded-2xl border border-white bg-night p-6 shadow-[0px_8px_28px_0px_rgba(41,48,102,0.18)]">

        <p className="text-[16px] font-semibold leading-6 text-white">
          {isAdmin ? "All services operational" : "Today’s focus"}
        </p>

        <p className="text-[14px] font-medium leading-5 text-white">
          {isAdmin ? "99.98% uptime  ·  48 ms latency" : "Submit database assignment"}
        </p>

        <ProgressBar value={67} />

        <p className="text-[12px] leading-[18px] text-whitemuted">
          {isAdmin
            ? "Only authorized administrators can sign in."
            : "4 of 6 steps complete. You’re making progress."}
        </p>

      </div>

      <p className="text-[12px] leading-[18px] text-whitemuted">
        {isAdmin ? "Private work stays private." : "Create tasks, generate plans, and track progress."}
      </p>

    </div>
  )
}

export default BrandPanel
