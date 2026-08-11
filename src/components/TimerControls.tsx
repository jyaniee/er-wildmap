interface TimerControlsProps {
  running: boolean
  elapsed: string
  onToggle: () => void
  onReset: () => void
  onAdjust: (seconds: number) => void
}

const buttonClass = `
  rounded-lg
  border
  border-[#303640]
  bg-[#171b21]
  px-[14px]
  py-[10px]
  text-[#dce1e8]
  transition
  hover:border-[#505966]
  hover:bg-[#20252d]
`

export function TimerControls({
  running,
  elapsed,
  onToggle,
  onReset,
  onAdjust,
}: TimerControlsProps) {
  return (
    <>
      <section
        className="
          flex
          items-center
          gap-2
        "
      >
        <button
          type="button"
          onClick={onToggle}
          className="
            min-w-[100px]
            rounded-lg
            border
            border-white
            bg-white
            px-[14px]
            py-[10px]
            font-extrabold
            text-[#0b0d10]
            transition
            hover:bg-[#e4e7eb]
          "
        >
          {running ? 'PAUSE' : 'START'}
        </button>

        <button
          type="button"
          onClick={onReset}
          className={buttonClass}
        >
          RESET
        </button>

        <div
          className="
            ml-auto
            flex
            gap-[6px]
          "
        >
          <button
            type="button"
            onClick={() => onAdjust(-5)}
            className={buttonClass}
          >
            -5s
          </button>

          <button
            type="button"
            onClick={() => onAdjust(-1)}
            className={buttonClass}
          >
            -1s
          </button>

          <button
            type="button"
            onClick={() => onAdjust(1)}
            className={buttonClass}
          >
            +1s
          </button>

          <button
            type="button"
            onClick={() => onAdjust(5)}
            className={buttonClass}
          >
            +5s
          </button>
        </div>
      </section>

      <footer
        className="
          flex
          justify-between
          text-xs
          text-[#666e79]
        "
      >
        <span>
          Elapsed{' '}
          <strong
            className="
              text-[#9ca3ad]
              tabular-nums
            "
          >
            {elapsed}
          </strong>
        </span>

        <span>
          Space: Start/Pause
        </span>
      </footer>
    </>
  )
}