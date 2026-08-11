import {
  CREDIT_MAPS,
  type CreditMap,
} from '../config/creditMaps'
import { CREDIT_MAP_NAME } from '../config/app'
import { CreditCard } from './CreditCard'

interface CreditSectionProps {
  onOpen: (map: CreditMap) => void
}

const CREDIT_ORDER = [
  'day1',
  'night1',
  'day2',
  'night2',
]

export function CreditSection({
  onOpen,
}: CreditSectionProps) {
  const maps = CREDIT_ORDER
    .map((id) =>
      CREDIT_MAPS.find(
        (map) => map.id === id,
      ),
    )
    .filter(
      (map): map is CreditMap =>
        map !== undefined,
    )

  return (
    <section
      id="credit-map"
      className="
        border-t
        border-[#252932]
        bg-[#0d1014]
        px-6
        py-14
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1200px]
        "
      >
        <header className="mb-8">
          <p
            className="
              text-[10px]
              font-bold
              tracking-[0.18em]
              text-[#747c89]
            "
          >
            REGION VALUE
          </p>

          <h2
            className="
              mt-1
              text-2xl
              font-bold
            "
          >
            {CREDIT_MAP_NAME}
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[#747c89]
            "
          >
            1~2일차 지역별 크레딧 수급량
          </p>
        </header>

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          {maps.map((map) => (
            <CreditCard
              key={map.id}
              map={map}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </section>
  )
}