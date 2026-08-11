export class GameTimer {
  private startedAt: number | null = null
  private accumulatedMs = 0
  private running = false

  start(): void {
    if (this.running) return

    this.startedAt = performance.now()
    this.running = true
  }

  pause(): void {
    if (!this.running || this.startedAt === null) return

    this.accumulatedMs += performance.now() - this.startedAt
    this.startedAt = null
    this.running = false
  }

  toggle(): void {
    if (this.running) {
      this.pause()
    } else {
      this.start()
    }
  }

  reset(): void {
    this.startedAt = null
    this.accumulatedMs = 0
    this.running = false
  }

  adjust(seconds: number): void {
    const adjustedMs = Math.max(
      0,
      this.getElapsedMilliseconds() + seconds * 1000,
    )

    this.accumulatedMs = adjustedMs

    if (this.running) {
      this.startedAt = performance.now()
    }
  }

  getElapsedSeconds(): number {
    return this.getElapsedMilliseconds() / 1000
  }

  isRunning(): boolean {
    return this.running
  }

  private getElapsedMilliseconds(): number {
    if (!this.running || this.startedAt === null) {
      return this.accumulatedMs
    }

    return this.accumulatedMs + (performance.now() - this.startedAt)
  }
}