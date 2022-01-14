import { alphanumeric, Counter } from '@app_types/types'
import { LoopType } from './Loop'

export interface TodoItem {
  _id?: alphanumeric
  userid?: string
  job: string
  date: string
  completed: boolean,
  loop: LoopType,
  loop_id: number
}

export interface IDFunc {
  (_id: alphanumeric | undefined): void
}

export interface GroupedTodoItems { [key: string]: TodoItem[] }

export type FilterMenu = {
  str: string,
  func: (todos: TodoItem[]) => TodoItem[],
  category: boolean
}

export { alphanumeric, Counter }
