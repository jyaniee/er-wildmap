async function toggleFullscreen(): Promise<void> {
  if (document.fullscreenElement) {
    await document.exitFullscreen()
    return
  }

  await document.documentElement.requestFullscreen()
}

export function Header() {
  return (
    <header
      className="
        flex
        items-center
        justify-between
      "
    >
      <div>
        <p
          className="
            m-0
            text-[11px]
            font-bold
            tracking-[0.18em]
            text-[#747c89]
          "
        >
          ETERNAL RETURN
        </p>

        <h1
          className="
            mt-1
            text-2xl
            font-bold
          "
        >
          ER Wildmap
        </h1>
      </div>

      <button
        type="button"
        title="Fullscreen"
        onClick={() => void toggleFullscreen()}
        className="
          flex
          size-10
          items-center
          justify-center
          rounded-lg
          border
          border-[#303640]
          bg-[#171b21]
          text-xl
          text-[#dce1e8]
          transition
          hover:border-[#505966]
          hover:bg-[#20252d]
        "
      >
        ⛶
      </button>
    </header>
  )
}