export class GameTimer {
  private startedAt: number | null = null

  start() {
    this.startedAt = performance.now()
  }

  reset() {
    this.startedAt = null
  }

  getElapsedSeconds(): number {
    if (this.startedAt === null) {
      return 0
    }

    return (performance.now() - this.startedAt) / 1000
  }
}