export interface CyclePhase {
  type: 'day' | 'night'
  duration: number
}

export const GAME_CYCLE: CyclePhase[] = [
  {
    type: 'day',
    duration: 180,
  },
  {
    type: 'night',
    duration: 120,
  },
]