export type PhaseType = 'day' | 'night'

export interface CyclePhase {
  day: number
  type: PhaseType
  duration: number
}

export const GAME_CYCLE: CyclePhase[] = [
  { day: 1, type: 'day', duration: 140 },
  { day: 1, type: 'night', duration: 110 },

  { day: 2, type: 'day', duration: 140 },
  { day: 2, type: 'night', duration: 130 },

  { day: 3, type: 'day', duration: 130 },
  { day: 3, type: 'night', duration: 110 },

  { day: 4, type: 'day', duration: 100 },
  { day: 4, type: 'night', duration: 110 },

  { day: 5, type: 'day', duration: 80 },
  { day: 5, type: 'night', duration: 80 },

  { day: 6, type: 'day', duration: 70 },
  { day: 6, type: 'night', duration: 50 },

  { day: 7, type: 'day', duration: 200 },
  { day: 7, type: 'night', duration: 60 },

  { day: 8, type: 'day', duration: 150 },
]

export const TOTAL_GAME_DURATION = GAME_CYCLE.reduce(
  (total, phase) => total + phase.duration,
  0,
)

export interface PhaseState {
  phase: CyclePhase
  index: number
  elapsedInPhase: number
  remainingInPhase: number
  finished: boolean
}

export function getPhaseState(elapsedSeconds: number): PhaseState {
  let remaining = Math.max(0, elapsedSeconds)

  for (let i = 0; i < GAME_CYCLE.length; i++) {
    const phase = GAME_CYCLE[i]

    if (remaining < phase.duration) {
      return {
        phase,
        index: i,
        elapsedInPhase: remaining,
        remainingInPhase: phase.duration - remaining,
        finished: false,
      }
    }

    remaining -= phase.duration
  }

  const lastIndex = GAME_CYCLE.length - 1
  const lastPhase = GAME_CYCLE[lastIndex]

  return {
    phase: lastPhase,
    index: lastIndex,
    elapsedInPhase: lastPhase.duration,
    remainingInPhase: 0,
    finished: true,
  }
}