export enum Status {
  WAIT,
  ANGRY,
  PAY,
  EATING
}

export const consumerMap = new Map<number, { path: string }>(
  [
    [0, {
      path: ''
    }],
    [1, {
      path: '/WebMooc-Restaurant/consumer-1.png'
    }],
    [2, {
      path: '/WebMooc-Restaurant/consumer-2.png'
    }],
    [3, {
      path: '/WebMooc-Restaurant/consumer-3.png'
    }],
    [4, {
      path: '/WebMooc-Restaurant/consumer-4.png'
    }],
    [5, {
      path: '/WebMooc-Restaurant/consumer-5.png'
    }],
    [6, {
      path: '/WebMooc-Restaurant/consumer-6.png'
    }],
    [7, {
      path: '/WebMooc-Restaurant/consumer-7.png'
    }]
  ]
)

export const background: string[] = [
  'linear-gradient(to bottom right, #EA4035, #A32015)',
  'linear-gradient(to bottom right, #F09641, #CC732A)',
  'linear-gradient(to bottom right, #A1FC4E, #4FAF32)'
]

export interface WaitingConsumer {
  seat: number,
  consumer: number | null,
  picId: number | null
}
