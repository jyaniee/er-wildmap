import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { GameTimer } from '../timer/gameTimer'

export function useGameTimer() {
  const timerRef = useRef<GameTimer | null>(null)

  if (timerRef.current === null) {
    timerRef.current = new GameTimer()
  }

  const timer = timerRef.current

  const [elapsed, setElapsed] = useState(
    timer.getElapsedSeconds(),
  )

  const [running, setRunning] = useState(
    timer.isRunning(),
  )

  useEffect(() => {
    if (!running) {
      return
    }

    const interval = window.setInterval(() => {
      setElapsed(timer.getElapsedSeconds())
    }, 100)

    return () => {
      window.clearInterval(interval)
    }
  }, [running, timer])

  const toggle = useCallback(() => {
    timer.toggle()

    setRunning(timer.isRunning())
    setElapsed(timer.getElapsedSeconds())
  }, [timer])

  const reset = useCallback(() => {
    timer.reset()

    setRunning(false)
    setElapsed(0)
  }, [timer])

  const adjust = useCallback(
    (seconds: number) => {
      timer.adjust(seconds)

      setElapsed(timer.getElapsedSeconds())
    },
    [timer],
  )

  return {
    elapsed,
    running,
    toggle,
    reset,
    adjust,
  }
}