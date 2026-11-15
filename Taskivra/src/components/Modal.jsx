// popup box shown in the middle of the screen with a dark overlay behind it
// onBack is optional, when it is given a "← Back" button is shown at the top
const Modal = ({ title, body, onBack, children }) => {

  const cardStyle = {
    backgroundImage:
      "linear-gradient(153.27deg, rgba(222, 227, 255, 0.92) 0%, rgba(242, 247, 255, 0.92) 35.361%, rgba(212, 242, 235, 0.92) 70.721%)"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6">

      <div
        style={cardStyle}
        className="flex w-full max-w-[560px] flex-col items-start gap-4 rounded-2xl border border-white p-8 shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.75)] shadow-[0px_8px_28px_0px_rgba(41,48,102,0.08)]"
      >

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-8 w-24 items-center justify-center rounded-lg bg-white text-[14px] font-medium leading-5 text-brand"
          >
            ← Back
          </button>
        )}

        <h2 className="w-full text-[20px] font-semibold leading-7 text-ink">{title}</h2>

        {body && <p className="w-full text-[14px] leading-[22px] text-muted">{body}</p>}

        {children}

      </div>

    </div>
  )
}

export default Modal
