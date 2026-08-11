import {
  useCallback,
  useEffect,
  useState,
} from 'react'

import {
  getPhaseState,
} from './config/cycle'

import type {
  CreditMap,
} from './config/creditMaps'

import { useGameTimer } from './hooks/useGameTimer'

import { Header } from './components/Header'
import { PhaseStatus } from './components/PhaseStatus'
import { WildlifeMap } from './components/WildlifeMap'
import { TimerControls } from './components/TimerControls'
import { CreditSection } from './components/CreditSection'
import { CreditModal } from './components/CreditModal'

import { SiteFooter } from './components/SiteFooter'

function formatTime(seconds: number): string {
  const safeSeconds =
    Math.max(0, Math.ceil(seconds))

  const minutes =
    Math.floor(safeSeconds / 60)

  const remainingSeconds =
    safeSeconds % 60

  return `${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`
}

async function toggleFullscreen(): Promise<void> {
  if (document.fullscreenElement) {
    await document.exitFullscreen()
    return
  }

  await document.documentElement.requestFullscreen()
}

export default function App() {
  const {
    elapsed,
    running,
    toggle,
    reset,
    adjust,
  } = useGameTimer()

  const [
    selectedCreditMap,
    setSelectedCreditMap,
  ] = useState<CreditMap | null>(null)

  const closeCreditModal =
    useCallback(() => {
      setSelectedCreditMap(null)
    }, [])

  const state =
    getPhaseState(elapsed)

  const { phase } = state

  const progress =
    state.finished
      ? 100
      : Math.min(
          100,
          (
            state.elapsedInPhase /
            phase.duration
          ) * 100,
        )

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      // Modal이 열려 있을 때는
      // 게임 타이머 단축키를 막음
      if (selectedCreditMap) {
        return
      }

      if (
        event.repeat &&
        event.code === 'Space'
      ) {
        return
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault()
          toggle()
          break

        case 'ArrowLeft':
          event.preventDefault()
          adjust(
            event.shiftKey
              ? -5
              : -1,
          )
          break

        case 'ArrowRight':
          event.preventDefault()
          adjust(
            event.shiftKey
              ? 5
              : 1,
          )
          break

        case 'KeyR':
          reset()
          break

        case 'KeyF':
          void toggleFullscreen()
          break
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [
    adjust,
    reset,
    selectedCreditMap,
    toggle,
  ])

return (
    <div
        className="
        min-h-screen
        min-w-[320px]
        bg-[radial-gradient(circle_at_top,#181d25_0,#0b0d10_55%)]
        font-sans
        text-[#f5f7fa]
        "
    >
        {/* 첫 화면: 기존 ER Wildmap UI */}
        <div
        className="
            relative
            mx-auto
            min-h-screen
            w-full
            max-w-[1200px]
            px-6
            py-6
        "
        >
        <main
            className="
            flex
            min-h-[calc(100vh-48px)]
            flex-col
            gap-[18px]
            "
        >
            <Header />

            <PhaseStatus
            type={phase.type}
            day={phase.day}
            remaining={formatTime(
                state.remainingInPhase,
            )}
            progress={progress}
            finished={state.finished}
            />

            <WildlifeMap
            type={phase.type}
            />

            <TimerControls
            running={running}
            elapsed={formatTime(elapsed)}
            onToggle={toggle}
            onReset={reset}
            onAdjust={adjust}
            />
        </main>

        {/* 아래에 추가 콘텐츠가 있다는 표시 */}
        <button
            type="button"
            onClick={() => {
            document
                .getElementById('credit-map')
                ?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                })
            }}
            aria-label="크레딧 가이드로 이동"
            className="
            group
            absolute
            bottom-2
            left-1/2
            flex
            -translate-x-1/2
            flex-col
            items-center
            gap-0.5
            text-[#68717e]
            transition-colors
            duration-200
            hover:text-[#cbd2dc]
            "
        >
            <span
            className="
                text-[9px]
                font-bold
                tracking-[0.18em]
            "
            >
            CREDIT MAP
            </span>

            <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="
                h-5
                w-5
                motion-safe:animate-bounce
            "
            aria-hidden="true"
            >
            <path d="m6 9 6 6 6-6" />
            </svg>
        </button>
        </div>

        {/* 스크롤 아래쪽: 크레딧 지도 */}
        <div id="credit-map">
        <CreditSection
            onOpen={setSelectedCreditMap}
        />
        </div>

        <SiteFooter />

        <CreditModal
        map={selectedCreditMap}
        onClose={closeCreditModal}
        />
    </div>
    )
}