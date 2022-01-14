<template>
  <main>
    <div v-for="(todo, idx) in data" :key="todo._id">
      <div class="input-group my-2 input-group-sm">
        <div class="input-group-text">
          <input
            class="form-check-input mt-0"
            type="checkbox"
            :checked="todo.completed"
            :disabled="todo.completed"
            @click="completeTodo(todo._id)"
          />
        </div>
        <div class="input-group-text d-none d-md-block">
          <input
            class="form-input mt-0"
            type="date"
            :min="today"
            disabled
            :value="todo.date"
          />
        </div>
        <input
          v-if="modifying_id == todo._id"
          type="text"
          class="form-control"
          v-model="modifying_job"
        />
        <input
          v-else
          type="text"
          class="form-control"
          :value="todo.job"
          readonly
          style="background-color: transparent"
        />
        <button
          v-if="modifying_id == todo._id"
          class="btn btn-primary"
          type="button"
          @click="onModifyComplete(todo)"
        >
          <span class="d-none d-md-inline">수정 완료</span>
        </button>
        <span v-else>
          <button
            :id="'dropdown-button-' + todo._id"
            class="btn btn-outline-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            <span class="d-none d-md-inline">할일 관리</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li v-for="item in menu" :key="item.str">
              <a class="dropdown-item" @click="item.func(todo._id)">{{
                item.str
              }}</a>
            </li>
          </ul>
        </span>
      </div>
      <div v-show="idx + 1 < data.length" class="col border border-second" />
    </div>
  </main>
</template>

<script lang="ts">
export default { name: 'TodoList' }
</script>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { TodoItem, IDFunc, alphanumeric } from '@todo_types/TodoItem'

interface Props {
  data: TodoItem[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

const removeTodoAsk = inject('removeTodoAsk') as IDFunc
const completeTodo = inject('completeTodo') as IDFunc
const moveTodoToday = inject('moveTodoToday') as IDFunc
const modifyTodo = inject('modifyTodo') as IDFunc

const modifying_job = ref<string>('')
const modifying_id = ref<alphanumeric | undefined>(undefined)
const modifying: IDFunc = (_id) => {
  const todo = props.data.find((item) => item._id == _id)
  modifying_job.value = todo!.job
  modifying_id.value = _id
}
const onModifyComplete = (todo: TodoItem) => {
  console.log('onModifyComplete')
  document
    .getElementById('dropdown-button-' + todo._id)
    ?.classList.remove('show')
  document
    .getElementById('dropdown-button-' + todo._id)
    ?.setAttribute('aria-expanded', 'false')
  todo.job = modifying_job.value
  modifying_id.value = undefined
  modifyTodo(todo._id)
}

const today = inject('today') as string
const menu = [
  {
    str: '할일 삭제',
    func: removeTodoAsk,
  },
  {
    str: '할일 완료',
    func: completeTodo,
  },
  {
    str: '할일 수정',
    func: modifying,
  },
  {
    str: '오늘로 이동',
    func: moveTodoToday,
  },
]
</script>
