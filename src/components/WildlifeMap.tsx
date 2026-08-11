import { useState } from 'react'

import type { PhaseType } from '../config/cycle'
import { MAP_IMAGES } from '../config/maps'

interface WildlifeMapProps {
  type: PhaseType
}

export function WildlifeMap({
  type,
}: WildlifeMapProps) {
  const src = MAP_IMAGES[type]

  const [failedImage, setFailedImage] =
    useState<string | null>(null)

  const failed = failedImage === src

  return (
    <section
      className="
        relative
        mx-auto
        aspect-[750/720]
        max-w-full
        overflow-hidden
        rounded-[14px]
        border
        border-[#252932]
        bg-[#111419]
      "
      style={{
        width:
          'min(780px, calc((100vh - 320px) * 750 / 720))',
      }}
    >
      {!failed && (
        <img
          src={src}
          alt={
            type === 'day'
              ? 'Day wildlife map'
              : 'Night wildlife map'
          }
          onLoad={() => {
            setFailedImage(null)
          }}
          onError={() => {
            setFailedImage(src)
          }}
          className="
            block
            size-full
            object-contain
          "
        />
      )}

      {failed && (
        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            gap-2
            text-[#727985]
          "
        >
          <strong className="text-[#aab0ba]">
            Map image not found
          </strong>

          <span>
            지도 이미지를 불러올 수 없습니다.
          </span>
        </div>
      )}
    </section>
  )
}