import './style.css'

import { getPhaseState, type PhaseType } from './config/cycle'
import { MAP_IMAGES } from './config/maps'
import { GameTimer } from './timer/gameTimer'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('#app element not found')
}

app.innerHTML = `
  <main class="app">
    <header class="header">
      <div>
        <p class="eyebrow">ETERNAL RETURN</p>
        <h1>ER Wildmap</h1>
      </div>

      <button
        id="fullscreenButton"
        class="icon-button"
        type="button"
        title="Fullscreen"
      >
        ⛶
      </button>
    </header>

    <section class="status">
      <div>
        <span id="phaseBadge" class="phase-badge day">
          DAY
        </span>

        <h2 id="phaseTitle">
          Day 1
        </h2>
      </div>

      <div class="time">
        <span class="time-label">
          NEXT PHASE
        </span>

        <strong id="remainingTime">
          02:20
        </strong>
      </div>
    </section>

    <div class="progress">
      <div
        id="progressBar"
        class="progress-bar"
      ></div>
    </div>

    <section class="map">
      <img
        id="mapImage"
        alt="Wildlife map"
      />

      <div
        id="mapPlaceholder"
        class="map-placeholder"
        hidden
      >
        <strong>Map image not found</strong>

        <span>
          ${MAP_IMAGES.day} 또는 ${MAP_IMAGES.night} 이미지를 확인해주세요.
        </span>
      </div>
    </section>

    <section class="controls">
      <button
        id="startButton"
        class="primary-button"
        type="button"
      >
        START
      </button>

      <button
        id="resetButton"
        class="button"
        type="button"
      >
        RESET
      </button>

      <div class="adjust-controls">
        <button type="button" data-adjust="-5">
          -5s
        </button>

        <button type="button" data-adjust="-1">
          -1s
        </button>

        <button type="button" data-adjust="1">
          +1s
        </button>

        <button type="button" data-adjust="5">
          +5s
        </button>
      </div>
    </section>

    <footer class="footer">
      <span>
        Elapsed
        <strong id="elapsedTime">00:00</strong>
      </span>

      <span>
        Space: Start/Pause
      </span>
    </footer>
  </main>
`

function getElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector)

  if (!element) {
    throw new Error(`${selector} element not found`)
  }

  return element
}

const timer = new GameTimer()

const phaseBadge =
  getElement<HTMLSpanElement>('#phaseBadge')

const phaseTitle =
  getElement<HTMLHeadingElement>('#phaseTitle')

const remainingTime =
  getElement<HTMLElement>('#remainingTime')

const elapsedTime =
  getElement<HTMLElement>('#elapsedTime')

const progressBar =
  getElement<HTMLDivElement>('#progressBar')

const mapImage =
  getElement<HTMLImageElement>('#mapImage')

const mapPlaceholder =
  getElement<HTMLDivElement>('#mapPlaceholder')

const startButton =
  getElement<HTMLButtonElement>('#startButton')

const resetButton =
  getElement<HTMLButtonElement>('#resetButton')

const fullscreenButton =
  getElement<HTMLButtonElement>('#fullscreenButton')

let currentMapType: PhaseType | null = null

function formatTime(seconds: number): string {
  const safeSeconds = Math.max(0, Math.ceil(seconds))

  const minutes = Math.floor(safeSeconds / 60)
  const remainingSeconds = safeSeconds % 60

  return `${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`
}

function updateMap(type: PhaseType): void {
  if (type === currentMapType) return

  currentMapType = type

  mapImage.src = MAP_IMAGES[type]

  mapImage.alt =
    type === 'day'
      ? 'Day wildlife map'
      : 'Night wildlife map'
}

mapImage.addEventListener('load', () => {
  mapImage.hidden = false
  mapPlaceholder.hidden = true
})

mapImage.addEventListener('error', () => {
  mapImage.hidden = true
  mapPlaceholder.hidden = false
})

function render(): void {
  const elapsed = timer.getElapsedSeconds()

  const state = getPhaseState(elapsed)

  const { phase } = state

  const phaseName =
    phase.type === 'day'
      ? `Day ${phase.day}`
      : `Night ${phase.day}`

  phaseBadge.textContent =
    phase.type.toUpperCase()

  phaseBadge.className =
    `phase-badge ${phase.type}`

  phaseTitle.textContent =
    state.finished
      ? 'Match End'
      : phaseName

  remainingTime.textContent =
    formatTime(state.remainingInPhase)

  elapsedTime.textContent =
    formatTime(elapsed)

  const progress =
    state.finished
      ? 100
      : (state.elapsedInPhase / phase.duration) * 100

  progressBar.style.width =
    `${Math.min(progress, 100)}%`

  startButton.textContent =
    timer.isRunning()
      ? 'PAUSE'
      : 'START'

  updateMap(phase.type)

  requestAnimationFrame(render)
}

startButton.addEventListener('click', () => {
  timer.toggle()
})

resetButton.addEventListener('click', () => {
  timer.reset()
})

document
  .querySelectorAll<HTMLButtonElement>('[data-adjust]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const seconds = Number(button.dataset.adjust)

      timer.adjust(seconds)
    })
  })

async function toggleFullscreen(): Promise<void> {
  if (document.fullscreenElement) {
    await document.exitFullscreen()
    return
  }

  await document.documentElement.requestFullscreen()
}

fullscreenButton.addEventListener(
  'click',
  toggleFullscreen,
)

window.addEventListener('keydown', (event) => {
  if (event.repeat && event.code === 'Space') {
    return
  }

  switch (event.code) {
    case 'Space':
      event.preventDefault()
      timer.toggle()
      break

    case 'ArrowLeft':
      event.preventDefault()

      timer.adjust(
        event.shiftKey
          ? -5
          : -1,
      )

      break

    case 'ArrowRight':
      event.preventDefault()

      timer.adjust(
        event.shiftKey
          ? 5
          : 1,
      )

      break

    case 'KeyR':
      timer.reset()
      break

    case 'KeyF':
      void toggleFullscreen()
      break
  }
})

render()