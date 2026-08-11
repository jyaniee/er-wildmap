import {
  APP_NAME,
  GAME_VERSION,
} from '../config/app'

import appIcon from '../assets/erwildmap-icon-256.png'


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
      {/* 로고 + 제목 */}
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <img
            src={appIcon}
            alt=""
            aria-hidden="true"
            className="
                size-11
                shrink-0
                object-contain
            "
            />

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
            ER WILDMAP
          </p>

          <div
            className="
              mt-1
              flex
              items-center
              gap-3
            "
          >
            <h1
              className="
                text-2xl
                font-bold
              "
            >
              {APP_NAME}
            </h1>

            <span
              className="
                rounded-md
                border
                border-[#303640]
                bg-[#171b21]
                px-2
                py-1
                text-[9px]
                font-bold
                tracking-[0.1em]
                text-[#7f8895]
              "
            >
              PATCH {GAME_VERSION}
            </span>
          </div>
        </div>
      </div>

      {/* 전체화면 */}
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