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
            border-[#2d3440]
            bg-[#111419]
            p-3
            shadow-[0_8px_30px_rgba(0,0,0,0.18)]
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
                text-[15px]
                font-extrabold
                text-[#e8edf5]
            "
            >
            {map.title}
        </h3>

        <span
          className="
            text-[10px]
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
            mt-3
            flex
            list-none
            flex-col
            gap-2
            p-0
        "
      >
        {map.rankings.map(
          ({ rank, regions }) => (
            <li
            key={`${rank}-${regions.join('-')}`}
            className="
                flex
                items-center
                gap-2
                rounded-md
                bg-[#171b21]
                px-2
                py-1.5
            "
            >
            <span
                className="
                flex
                min-w-[34px]
                items-center
                justify-center
                rounded-md
                bg-[#242a33]
                px-2
                py-1
                text-[10px]
                font-extrabold
                text-[#8d98a8]
                "
            >
                {rank}
            </span>

            <span
                className="
                text-[12px]
                font-semibold
                text-[#d6dce5]
                "
            >
                {regions.join(' · ')}
            </span>
            </li>
          ),
        )}
      </ol>
    </article>
  )
}