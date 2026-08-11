import { useEffect } from 'react'

interface AboutModalProps {
  open: boolean
  onClose: () => void
}

export function AboutModal({
  open,
  onClose,
}: AboutModalProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        px-6
        backdrop-blur-[2px]
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        className="
          w-full
          max-w-[420px]
          rounded-xl
          border
          border-[#2a3038]
          bg-[#11151a]
          p-6
          shadow-2xl
        "
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#68717e]">
              ABOUT
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#f5f7fa]">
              ER Wildmap
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="
              text-xl
              leading-none
              text-[#68717e]
              transition-colors
              hover:text-[#d3d8df]
            "
          >
            ×
          </button>
        </div>

        <p className="mt-5 text-sm leading-6 text-[#89929f]">
          이터널 리턴의 낮/밤 주기에 따른
          늑대와 곰의 위치를 확인하기 위한
          비공식 야생동물 지도 도구입니다.
        </p>

        <div className="mt-6 border-t border-[#262c33] pt-5">
          <p className="text-[10px] font-bold tracking-[0.14em] text-[#59616c]">
            DEVELOPER
          </p>

          <p className="mt-2 text-sm font-medium text-[#cbd2dc]">
            Developed by Jyanie
          </p>
        </div>

        <div className="mt-5 space-y-2">
          <a
            href="https://github.com/jyaniee/er-wildmap"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              justify-between
              rounded-lg
              px-3
              py-2
              text-sm
              text-[#89929f]
              transition-colors
              hover:bg-[#191e24]
              hover:text-[#d3d8df]
            "
          >
            <span>GitHub</span>
            <span className="text-[#59616c]">↗</span>
          </a>

          <a
            href="https://arca.live/b/bser/179199377"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              justify-between
              rounded-lg
              px-3
              py-2
              text-sm
              text-[#89929f]
              transition-colors
              hover:bg-[#191e24]
              hover:text-[#d3d8df]
            "
          >
            <span>Credit Map Source</span>
            <span className="text-[#59616c]">↗</span>
          </a>
        </div>

        <p
          className="
            mt-6
            border-t
            border-[#262c33]
            pt-4
            text-[10px]
            leading-5
            text-[#555d68]
          "
        >
          Unofficial fan-made tool.
          <br />
          Not affiliated with or endorsed by Nimble Neuron.
        </p>
      </div>
    </div>
  )
}