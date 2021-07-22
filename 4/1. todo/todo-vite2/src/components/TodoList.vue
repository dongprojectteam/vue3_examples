<template>
  <main>
    <div v-for="(todo, idx) in data" :key="todo.id">
      <div class="input-group my-2 input-group-sm">
        <div class="input-group-text">
          <input
            class="form-check-input mt-0"
            type="checkbox"
            :checked="todo.completed"
            :disabled="todo.completed"
            @click="completeTodo(todo.id)"
          />
        </div>
        <div class="input-group-text">
          <input
            class="form-input mt-0"
            type="date"
            :min="today"
            disabled
            :value="todo.date"
          />
        </div>
        <input type="text" class="form-control" :value="todo.job" />
        <button
          class="btn btn-outline-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          할일 관리
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="item in menu" :key="item.str">
            <a class="dropdown-item" @click="item.func(todo.id)">{{
              item.str
            }}</a>
          </li>
        </ul>
      </div>
      <div v-show="idx + 1 < data.length" class="col border border-second" />
    </div>
  </main>
</template>

<script>
export default {
  name: "TodoList",
}
</script>

<script setup>
import { inject } from "vue"
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
})

const removeTodo = inject("removeTodo")
const completeTodo = inject("completeTodo")
const today = inject("today")
const menu = [
  {
    str: "할일 삭제",
    func: removeTodo,
  },
  {
    str: "할일 완료",
    func: completeTodo,
  },
]
</script>
