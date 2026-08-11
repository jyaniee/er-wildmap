import type {
  CreditMap,
} from '../config/creditMaps'

interface CreditCardProps {
  map: CreditMap
  onOpen: (map: CreditMap) => void
}

export function CreditCard({
  map,
  onOpen,
}: CreditCardProps) {
  return (
    <article
      className="
        overflow-hidden
        rounded-xl
        border
        border-[#252932]
        bg-[#111419]
        p-[9px]
      "
    >
      <div
        className="
          mb-[7px]
          flex
          items-center
          justify-between
        "
      >
        <h3
          className="
            text-[13px]
            font-bold
            text-[#dce1e8]
          "
        >
          {map.title}
        </h3>

        <span
          className="
            text-[9px]
            font-bold
            tracking-[0.1em]
            text-[#626a76]
          "
        >
          CREDIT
        </span>
      </div>

      <button
        type="button"
        onClick={() => onOpen(map)}
        aria-label={`${map.title} 크레딧 지도 확대`}
        className="
          block
          w-full
          overflow-hidden
          rounded-[7px]
          bg-transparent
        "
      >
        <img
          src={map.image}
          alt={`${map.title} 지역별 크레딧 지도`}
          className="
            block
            h-auto
            w-full
            transition
            duration-150
            hover:scale-[1.025]
            hover:brightness-110
          "
        />
      </button>

      <ol
        className="
          mt-2
          flex
          list-none
          flex-col
          gap-1
          p-0
          text-[10px]
        "
      >
        {map.rankings.map(
          ({ rank, regions }) => (
            <li
              key={`${rank}-${regions.join('-')}`}
              className="
                flex
                items-baseline
                gap-[6px]
                text-[#abb2bc]
              "
            >
              <span
                className="
                  min-w-[28px]
                  shrink-0
                  text-[9px]
                  font-extrabold
                  text-[#6f7884]
                "
              >
                {rank}
              </span>

              <span>
                {regions.join(' · ')}
              </span>
            </li>
          ),
        )}
      </ol>
    </article>
  )
}