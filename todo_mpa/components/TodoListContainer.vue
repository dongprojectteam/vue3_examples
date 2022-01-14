<template>
  <TodoListNew />
  <section class="container">
    <div class="row justify-content-center m-2">
      <TodoListMain />
    </div>
    <div>
      <TodoCalendar title="Todo Calendar" :todos="todos" class="mt-5" />
    </div>
  </section>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div class="toast" role="alert" ref="toast_ref">
      <div class="toast-header">
        <svg
          class="bd-placeholder-img rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100%" height="100%" fill="#007aff" />
        </svg>
        <strong class="me-auto">알림</strong>
        <button type="button" class="btn-close"></button>
      </div>
      <div
        class="toast-body"
        :class="{ 'text-primary': toast_result, 'text-danger': !toast_result }"
      >
        {{ toast_text }}
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" ref="modal_ref" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h6 class="modal-title text-white">할일 삭제</h6>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col text-center">
              <button
                class="btn btn-primary btn-sm"
                @click="removeTodo(last_id)"
              >
                이번만 삭제
              </button>
            </div>
            <div class="col text-center">
              <button
                class="btn btn-danger btn-sm"
                @click="removeSeries(last_id)"
              >
                일정 모두 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'TodoListContainer' }
</script>

<script setup lang="ts">
import { reactive, provide, watch, onMounted, ref, inject } from 'vue'
import { useStorage } from '../compositions/useStorage'
import { useDatabase } from '../compositions/useDatabase'
import TodoListNew from './TodoListNew.vue'
import TodoListMain from './TodoListMain.vue'
import TodoCalendar from './TodoCalendar.vue'
import { TodoItem, alphanumeric } from '@todo_types/TodoItem'
import { LoopType } from '@todo_types/Loop'
import { Toast, Modal } from 'bootstrap'

interface Props {
  logged_in?: boolean
  userid?: string
}

const props = withDefaults(defineProps<Props>(), {
  logged_in: false,
  userid: undefined,
})

const last_id = ref<alphanumeric>('')
const todos = ref<TodoItem[]>([])
const { loadTodos, saveTodos, removeAllTodos, storage_id } = useStorage()
const { loadDBTodos, saveDBTodos, updateDBTodo, removeDBTodo, removeDBSeries } =
  useDatabase()

provide('todos', reactive(todos))

const initTodos = (initial_todos: TodoItem[]): void => {
  todos.value = initial_todos
}

const mergeTodos = (new_todos: TodoItem[]): void => {
  console.log('Todo Application : Syncing with cloud...')
  let delta_todos = ref<TodoItem[]>([])
  todos.value.forEach((obj: TodoItem) => {
    if (
      new_todos.find((item) => item.job == obj.job && item.date == obj.date) ===
      undefined
    ) {
      delta_todos.value.push({
        userid: props.userid,
        job: obj.job,
        date: obj.date,
        completed: obj.completed,
        loop: obj.loop ? obj.loop : LoopType.None,
        loop_id: obj.loop_id ? obj.loop_id : 0,
      })
    }
  })
  if (delta_todos.value.length > 0) {
    saveDBTodos(delta_todos.value, (status, data) => {
      if (status) {
        todos.value = new_todos.concat(delta_todos.value)
        showToast(true, '동기화에 성공하였습니다.')
      } else {
        showToast(false, '동기화에 실패하였습니다.')
      }
    })
  } else {
    initTodos(new_todos)
  }
  removeAllTodos()
}

const addTodos = (
  new_todos: TodoItem[],
  callback: (result: boolean) => void
) => {
  if (props.logged_in) {
    for (let item in new_todos) {
      new_todos[item].userid = props.userid
    }
    saveDBTodos(new_todos, (status: boolean, data) => {
      if (status) {
        todos.value = data.concat(todos.value)
        showToast(true, '성공적으로 저장했습니다.')
        callback(true)
      } else {
        showToast(false, '저장하지 못했습니다.')
        callback(false)
      }
    })
  } else {
    for (let item in new_todos) {
      new_todos[item]._id = storage_id.value++
      todos.value = new_todos.concat(todos.value)
      saveTodos(todos.value)
      callback(true)
    }
  }
}

const addTodo = (job: string, date: string): void => {
  const new_item = ref<TodoItem[]>([
    {
      job: job,
      date: date,
      completed: false,
      loop: LoopType.None,
      loop_id: 0,
    },
  ])

  if (props.logged_in) {
    new_item.value[0].userid = props.userid
    saveDBTodos(new_item.value, (status: boolean, data) => {
      if (status) {
        todos.value = data.concat(todos.value)
        showToast(true, '성공적으로 저장했습니다.')
      } else {
        showToast(false, '저장하지 못했습니다.')
      }
    })
  } else {
    new_item.value[0]._id = storage_id.value++
    todos.value = new_item.value.concat(todos.value)
    saveTodos(todos.value)
  }
}

const removeTodoAsk = (_id: alphanumeric | undefined): void => {
  if (_id != undefined || _id != null) {
    const item: TodoItem = todos.value.find(
      (item) => _id == item._id
    ) as TodoItem

    if (item.loop) {
      last_id.value = _id
      showModal()
    } else {
      removeTodo(_id)
    }
  }
}

const removeTodo = (_id: alphanumeric | undefined): void => {
  if (_id != undefined || _id != null) {
    if (props.logged_in) {
      removeDBTodo(_id, (status) => {
        if (status) {
          todos.value = todos.value.filter((item) => _id != item._id)
          showToast(true, '성공적으로 삭제했습니다.')
        } else showToast(false, '삭제하지 못했습니다.')
        modal.hide()
      })
    } else {
      todos.value = todos.value.filter((item) => _id != item._id)
      saveTodos(todos.value)
      modal.hide()
    }
  }
}

const removeSeries = (_id: alphanumeric): void => {
  const it = todos.value.find((item) => item._id == _id) as TodoItem
  if (props.logged_in) {
    removeDBSeries(it.loop_id, (status) => {
      if (status) {
        todos.value = todos.value.filter((item) => it.loop_id != item.loop_id)
        showToast(true, '성공적으로 삭제했습니다.')
      } else showToast(false, '삭제하지 못했습니다.')
      modal.hide()
    })
  } else {
    todos.value = todos.value.filter((item) => it.loop_id != item.loop_id)
    saveTodos(todos.value)
  }
}

const completeTodo = (_id: alphanumeric | undefined): void => {
  if (_id != undefined || _id != null) {
    let todo: TodoItem | undefined = todos.value.find((todo) => todo._id == _id)
    if (todo) {
      todo.completed = true
      if (props.logged_in) {
        updateDBTodo(todo, (status: boolean) => {
          if (!status) {
            todo && (todo.completed = false)
            showToast(false, '할일을 반영하지 못했습니다.')
          } else {
            showToast(true, '할일을 완료하였습니다.')
          }
        })
      } else saveTodos(todos.value)
    }
  }
}

const modifyTodo = (_id: alphanumeric | undefined): void => {
  if (_id != undefined || _id != null) {
    let todo: TodoItem | undefined = todos.value.find((todo) => todo._id == _id)
    if (todo) {
      if (props.logged_in) {
        updateDBTodo(todo, (status: boolean) => {
          if (!status) {
            showToast(false, '수정하지 못했습니다..')
          } else {
            showToast(true, '성공적으로 수정하였습니다.')
          }
        })
      } else {
        saveTodos(todos.value)
      }
    }
  }
}

const today = inject('today') as string
const moveTodoToday = (_id: alphanumeric | undefined): void => {
  if (_id) {
    let todo: TodoItem | undefined = todos.value.find((todo) => todo._id == _id)
    if (todo) {
      todo.date = today
      if (props.logged_in) {
        updateDBTodo(todo, (status: boolean) => {
          if (!status) {
            todo && (todo.completed = false)
            showToast(false, '할일을 반영하지 못했습니다.')
          } else {
            showToast(true, '할일을 완료하였습니다.')
          }
        })
      } else saveTodos(todos.value)
    }
  }
}

provide('addTodo', addTodo)
provide('addTodos', addTodos)
provide('removeTodoAsk', removeTodoAsk)
provide('removeTodo', removeTodo)
provide('completeTodo', completeTodo)
provide('modifyTodo', modifyTodo)
provide('moveTodoToday', moveTodoToday)

if (props.logged_in) {
  loadDBTodos(initTodos, props.userid)
} else {
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

///------- TOAST
let toast: Toast
const toast_ref = ref<HTMLDivElement>()
const toast_text = ref('')
const toast_result = ref(false)

const showToast = (result: boolean, text: string) => {
  toast_result.value = result
  toast_text.value = text
  toast.show()
}

///---------- MODAL
const modal_ref = ref<HTMLDivElement>()
let modal: Modal

const showModal = () => {
  modal.show()
}

onMounted(() => {
  if (toast_ref.value) toast = new Toast(toast_ref.value)
  if (modal_ref.value) modal = new Modal(modal_ref.value)
})
</script>
