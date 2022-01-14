import { inject, unref } from 'vue'
import { TodoItem } from '@todo_types/TodoItem'

export const useFilter = () => {
  const today = inject('today') as string
  const fnSort = (a: TodoItem, b: TodoItem): number => {
    const a_date = Date.parse(a.date)
    const b_date = Date.parse(b.date)
    if (a_date > b_date) return -1
    else if (a_date < b_date) return 1
    return ('' + (b._id as string)).localeCompare((a._id as string))
  }

  const getPendingTodos = (todos: TodoItem[]): TodoItem[] => {
    return todos
      .filter((todo) => todo.date < today && !todo.completed)
      .slice()
      .sort(fnSort)
  }

  const getActiveTodayTodos = (todos: TodoItem[]): TodoItem[] => {
    return todos
      .filter((todo) => todo.date == today && !todo.completed)
      .slice()
      .sort(fnSort)
  }

  const getCompletedTodayTodos = (todos: TodoItem[]): TodoItem[] => {
    return todos
      .filter((todo) => todo.date == today && todo.completed)
      .slice()
      .sort(fnSort)
  }

  const getAllTodayTodos = (todos: TodoItem[]): TodoItem[] => {
    return getActiveTodayTodos(todos)
      .concat(getCompletedTodayTodos(todos))
      .slice()
      .sort(fnSort)
  }

  const getAllTodos = (todos: TodoItem[]): TodoItem[] => {
    return todos.slice().sort(fnSort)
  }

  return {
    getPendingTodos,
    getActiveTodayTodos,
    getCompletedTodayTodos,
    getAllTodayTodos,
    getAllTodos,
  }
}
