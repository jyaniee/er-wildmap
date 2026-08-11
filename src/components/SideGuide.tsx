import { useState } from 'react'

export function SideGuide() {
  const [visible, setVisible] = useState(true)

  return (
    <aside
      className="
        fixed
        right-6
        top-1/2
        z-20
        hidden
        -translate-y-1/2
        min-[1600px]:block
      "
    >
      <div className="w-[190px]">
        {visible && (
          <div className="mb-4">
            <p
              className="
                mb-4
                text-[9px]
                font-bold
                tracking-[0.18em]
                text-[#59616c]
              "
            >
              HOW TO USE
            </p>

            <div
              className="
                space-y-4
                text-[11px]
                leading-[1.6]
                text-[#555c66]
              "
            >
               <div className="flex gap-3">
                    <span className="shrink-0 text-[#3f464f]">01</span>
                    <p>게임을 시작합니다.</p>
                </div>

                <div className="flex gap-3">
                    <span className="shrink-0 text-[#3f464f]">02</span>
                    <p>
                    게임 시작 타이밍에 맞춰
                    <br />
                    START를 누릅니다.
                    </p>
                </div>

                <div className="flex gap-3">
                    <span className="shrink-0 text-[#3f464f]">03</span>
                    <p>
                    낮/밤 주기에 따라
                    <br />
                    지도가 자동으로 전환됩니다.
                    </p>
                </div>

                <div className="flex gap-3">
                    <span className="shrink-0 text-[#3f464f]">04</span>
                    <p>
                    시간이 어긋났다면
                    <br />
                      <span className="text-[#6a727d]">±1s / ±5s</span>로 보정합니다.
                    </p>
                </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="
            flex
            items-center
            gap-1.5
            text-[9px]
            font-bold
            tracking-[0.14em]
            text-[#454c56]
            transition-colors
            hover:text-[#7d8693]
          "
        >
          <span
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${visible ? 'bg-[#68717e]' : 'bg-[#343a43]'}
            `}
          />

          GUIDE
        </button>
      </div>
    </aside>
  )
}