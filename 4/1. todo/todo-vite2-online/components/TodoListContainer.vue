<template>
  <TodoListNew />
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <section class="container">
    <div class="row justify-content-center m-2">
      <TodoListMain />
    </div>
  </section>
</template>

<script>
export default { name: 'TodoListContainer' }
</script>

<script setup>
import { ref, readonly, provide, watch } from 'vue'
import { useStorage } from '../compositions/storage'
import { useDatabase } from '../compositions/useDatabase'
import TodoListNew from './TodoListNew.vue'
import TodoListMain from './TodoListMain.vue'

const props = defineProps({
  logged_in: {
    type: Boolean,
    default: false,
  },
  userid: {
    type: String,
    default: null,
  },
})

const todos = ref([])
const { loadTodos, saveTodos, removeAllTodos, storage_id } = useStorage()
const { loadDBTodos, saveDBTodos, completeDBTodo, removeDBTodo } = useDatabase()

provide('todos', readonly(todos))

const initTodos = (init_todos) => {
  todos.value = init_todos
}

const mergeTodos = (new_todos) => {
  console.log('Todo Application : Syncing with cloud...')
  let delta_todos = ref([])
  todos.value.forEach((obj) => {
    if (
      new_todos.find((item) => item.job == obj.job && item.date == obj.date) === undefined
    ) {
      delta_todos.value.push({
        userid: props.userid,
        job: obj.job,
        date: obj.date,
        completed: obj.completed,
      })
    }
  })
  if (delta_todos.value.length > 0) {
    saveDBTodos(delta_todos, (status, item) => {
      if (status) {
        todos.value = new_todos.concat(delta_todos.value)
      }
      else console.log('Failed to save!')
    })
  } else {
    initTodos(new_todos)
  }
  removeAllTodos()
}

const addTodo = (job, date) => {
  let new_item = ref([
    {
      job: job,
      date: date,
      completed: false,
    },
  ])

  if (props.logged_in) {
    new_item.value[0].userid = props.userid
    saveDBTodos(new_item, (status, item) => {
      if (status) todos.value = item.concat(todos.value)
      else console.log('Failed to save!')
    })
  } else {
    new_item.value[0]._id = storage_id.value++
    todos.value = new_item.value.concat(todos.value)
    saveTodos(todos)
  }
}
const removeTodo = (_id) => {
  if (props.logged_in) {
    removeDBTodo(_id, (status) => {
      if (status) todos.value = todos.value.filter((item) => _id != item._id)
      else console.log('Failed to remove!')
    })
  } else {
    todos.value = todos.value.filter((item) => _id != item._id)
    saveTodos(todos)
  }
}

const completeTodo = (_id) => {
  let todo = todos.value.find((todo) => todo._id == _id)
  todo.completed = true
  if (props.logged_in) {
    if (
      completeDBTodo(todo, (status) => {
        if (!status) {
          todo.completed = false
          console.log('Failed to update data')
        }
      })
    ) {
    }
  } else saveTodos(todos)
}

provide('addTodo', addTodo)
provide('removeTodo', removeTodo)
provide('completeTodo', completeTodo)

if (props.logged_in) {
  loadDBTodos(initTodos, props.userid)
}
else {
  loadTodos(initTodos)
}

watch(
  () => props.logged_in,
  (next, prev) => {
    if (next == true) {
      loadDBTodos(mergeTodos, props.userid)
    }
  }
)
</script>
