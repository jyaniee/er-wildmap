import { useEffect } from 'react'

import type {
  CreditMap,
} from '../config/creditMaps'

interface CreditModalProps {
  map: CreditMap | null
  onClose: () => void
}

export function CreditModal({
  map,
  onClose,
}: CreditModalProps) {
  useEffect(() => {
    if (!map) {
      return
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.code === 'Escape') {
        onClose()
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      document.body.style.overflow =
        previousOverflow

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [map, onClose])

  if (!map) {
    return null
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-6
      "
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="
          absolute
          inset-0
          size-full
          bg-black/70
          backdrop-blur-[5px]
        "
      />

      <div
        className="
          relative
          z-10
          max-h-[92vh]
          w-[min(750px,90vw)]
          overflow-auto
          rounded-[14px]
          border
          border-[#333943]
          bg-[#101318]
          p-[14px]
          shadow-2xl
        "
      >
        <div
          className="
            mb-[10px]
            flex
            items-center
            justify-between
          "
        >
          <h2
            className="
              text-base
              font-bold
            "
          >
            {map.title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="
              flex
              size-[34px]
              items-center
              justify-center
              rounded-lg
              border
              border-[#303640]
              bg-[#171b21]
              text-[22px]
            "
          >
            ×
          </button>
        </div>

        <img
          src={map.image}
          alt={`${map.title} 지역별 크레딧 지도`}
          className="
            block
            h-auto
            w-full
            rounded-lg
          "
        />
      </div>
    </div>
  )
}