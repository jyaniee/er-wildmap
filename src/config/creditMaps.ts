export interface CreditRanking {
  rank: string
  regions: string[]
}

export interface CreditMap {
  id: string
  title: string
  image: string
  rankings: CreditRanking[]
}

export const CREDIT_MAPS: CreditMap[] = [
  {
    id: 'day1',
    title: '1일차 낮',
    image: '/maps/credits/day1.webp',
    rankings: [
      {
        rank: '1',
        regions: ['공장'],
      },
      {
        rank: '2',
        regions: ['학교'],
      },
      {
        rank: '3',
        regions: ['묘지'],
      },
    ],
  },

  {
    id: 'night1',
    title: '1일차 밤',
    image: '/maps/credits/night1.webp',
    rankings: [
      {
        rank: '1',
        regions: ['연구소'],
      },
      {
        rank: '공동 2',
        regions: ['창고', '묘지', '경찰서'],
      },
      {
        rank: '3',
        regions: ['주유소'],
      },
    ],
  },

  {
    id: 'day2',
    title: '2일차 낮',
    image: '/maps/credits/day2.webp',
    rankings: [
      {
        rank: '1',
        regions: ['공장'],
      },
      {
        rank: '2',
        regions: ['양궁장'],
      },
      {
        rank: '3',
        regions: ['학교'],
      },
    ],
  },

  {
    id: 'night2',
    title: '2일차 밤',
    image: '/maps/credits/night2.webp',
    rankings: [
      {
        rank: '공동 1',
        regions: ['절', '연구소'],
      },
      {
        rank: '2',
        regions: ['모래사장'],
      },
      {
        rank: '3',
        regions: ['바지선'],
      },
    ],
  },
]