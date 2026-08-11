import type { PhaseType } from '../config/cycle'

interface PhaseStatusProps {
  type: PhaseType
  day: number
  remaining: string
  progress: number
  finished: boolean
}

export function PhaseStatus({
  type,
  day,
  remaining,
  progress,
  finished,
}: PhaseStatusProps) {
  const badgeColors =
    type === 'day'
      ? 'bg-[#ffd76a] text-[#281e00]'
      : 'bg-[#5966d9] text-[#e7ebff]'

  return (
    <>
      <section
        className="
          flex
          items-center
          justify-between
        "
      >
        <div className="flex items-center">
          <span
            className={`
              inline-flex
              rounded-full
              px-[10px]
              py-[6px]
              text-xs
              font-extrabold
              tracking-[0.08em]
              ${badgeColors}
            `}
          >
            {type.toUpperCase()}
          </span>

          <h2
            className="
              ml-[10px]
              text-xl
              font-bold
            "
          >
            {finished
              ? 'Match End'
              : `${type === 'day' ? 'Day' : 'Night'} ${day}`}
          </h2>
        </div>

        <div className="text-right">
          <span
            className="
              block
              text-[10px]
              font-bold
              tracking-[0.12em]
              text-[#747c89]
            "
          >
            NEXT PHASE
          </span>

          <strong
            className="
              text-[26px]
              tabular-nums
            "
          >
            {remaining}
          </strong>
        </div>
      </section>

      <div
        className="
          h-1
          overflow-hidden
          rounded-full
          bg-[#252932]
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-white
            transition-[width]
            duration-100
            ease-linear
          "
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </>
  )
}