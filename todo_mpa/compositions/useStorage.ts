import { ref, reactive, toRefs } from 'vue'
import { TodoItem } from '@/todo/types/TodoItem'

export const useStorage = () => {
  const KEY = 'my-todo-list'
  const storage_obj = reactive({ storage_id: 0 })
  const loadTodos = (initTodos: (initial_todos: TodoItem[]) => void) => {
    console.log("TODO Application: Load data from cache")
    let temp_todos: TodoItem[] = JSON.parse(localStorage.getItem(KEY) || '[]')
    temp_todos.forEach((todo: TodoItem, idx: number) => {
      todo._id = idx
    })
    storage_obj.storage_id = temp_todos.length
    initTodos(temp_todos)
  }

  const saveTodos = (todos: TodoItem[]) => {
    localStorage.setItem(KEY, JSON.stringify(todos))
  }

  const removeAllTodos = () => {
    localStorage.setItem(KEY, JSON.stringify([]))
  }

  return {
    ...toRefs(storage_obj),
    loadTodos,
    saveTodos,
    removeAllTodos
  }
}
