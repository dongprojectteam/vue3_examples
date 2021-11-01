import { reactive, toRefs } from 'vue'

export const useStorage = () => {
  const KEY = 'my-todo-list'
  const storage_obj = reactive({ storage_id: 0 })
  const loadTodos = (initTodos) => {
    console.log("TODO Application: Load data from cache")
    let temp_todos = JSON.parse(localStorage.getItem(KEY) || '[]')
    temp_todos.forEach((todo, idx) => {
      todo._id = idx
    })
    storage_obj.storage_id = temp_todos.length
    initTodos(temp_todos)
  }

  const saveTodos = (todos) => {
    localStorage.setItem(KEY, JSON.stringify(todos.value))
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
