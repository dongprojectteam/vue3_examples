import { TodoItem } from '@todo_types/TodoItem'

export interface CellItem {
    date: Date
    in_month: boolean,
    completed: TodoItem[],
    todos: TodoItem[]
}

export interface CalendarInfo {
    rows: number,
    today: Date,
    this_month: string,
    date_month: string
}
