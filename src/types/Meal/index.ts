export enum MealType {
  PRE,
  MAIN,
  DRINK
}

export interface Meal {
  id: number
  name: string,
  price: number,
  type: MealType,
  time: number
}
