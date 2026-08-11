import {
  CREDIT_MAPS,
  type CreditMap,
} from '../config/creditMaps'

import { CreditCard } from './CreditCard'

interface CreditRailProps {
  ids: string[]
  onOpen: (map: CreditMap) => void
}

export function CreditRail({
  ids,
  onOpen,
}: CreditRailProps) {
  const maps = ids
    .map((id) =>
      CREDIT_MAPS.find((map) => map.id === id),
    )
    .filter(
      (map): map is CreditMap =>
        map !== undefined,
    )

  return (
    <div
      className="
        flex
        flex-col
        gap-[14px]
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
  )
}