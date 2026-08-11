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
import { CreditRail } from './components/CreditRail'
import { CreditModal } from './components/CreditModal'

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
      {/*
        중앙 앱 최대 1200px.

        CreditRail은 absolute로
        중앙 앱의 right-full / left-full에 배치.
      */}
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
        {/* 왼쪽 실제 여백 */}
        <aside
          className="
            absolute
            right-full
            top-[190px]
            mr-6
            hidden
            w-[210px]
            min-[1700px]:block
          "
        >
          <CreditRail
            ids={[
              'day1',
              'night1',
            ]}
            onOpen={
              setSelectedCreditMap
            }
          />
        </aside>

        {/* 기존 중앙 앱 */}
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

        {/* 오른쪽 실제 여백 */}
        <aside
          className="
            absolute
            left-full
            top-[190px]
            ml-6
            hidden
            w-[210px]
            min-[1700px]:block
          "
        >
          <CreditRail
            ids={[
              'day2',
              'night2',
            ]}
            onOpen={
              setSelectedCreditMap
            }
          />
        </aside>
      </div>

      <CreditModal
        map={selectedCreditMap}
        onClose={closeCreditModal}
      />
    </div>
  )
}