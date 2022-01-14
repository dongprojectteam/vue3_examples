<template>
  <TodoListMenu v-on:change-filter="onChangeFilter" class="p-0" />
  <div v-for="key in Object.keys(filtered_todos as object)" class="mb-3">
    <div v-if="use_category">
      <em>{{ key }}</em>
    </div>
    <TodoList :data="filtered_todos[key]" />
  </div>
  <div class="my-2 mt-5">
    <span style="background-color: red">&nbsp;</span>&nbsp;
    <strong>처리하지 못한 작업들</strong>
  </div>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <TodoList :data="pending_todos" />
</template>

<script lang="ts">
export default { name: 'TodoListMain' }
</script>

<script setup lang="ts">
import { ref, provide, inject, watch, Ref } from 'vue'
import { useFilter } from '@todo_compositions/userFilter'
import TodoListMenu from './TodoListMenu.vue'
import TodoList from './TodoList.vue'
import { TodoItem, FilterMenu, GroupedTodoItems } from '@/todo/types/TodoItem'

const {
  getPendingTodos,
  getActiveTodayTodos,
  getCompletedTodayTodos,
  getAllTodayTodos,
  getAllTodos,
} = useFilter()
const filter = ref(0)
const filtered_todos = ref<GroupedTodoItems>({})
const pending_todos = ref<TodoItem[]>([])
const use_category = ref(false)
const todos = inject('todos') as Ref<TodoItem[]>

const filters: FilterMenu[] = [
  {
    str: '해야 할 작업들',
    func: getActiveTodayTodos,
    category: false,
  },
  {
    str: '완료한 작업들',
    func: getCompletedTodayTodos,
    category: false,
  },
  {
    str: '오늘의 모든 기록',
    func: getAllTodayTodos,
    category: false,
  },
  {
    str: '모든 작업',
    func: getAllTodos,
    category: true,
  },
]

provide('filters', filters)


const groupBy = (todos: TodoItem[]): {} => {
  return todos.reduce((acc: GroupedTodoItems, cur: TodoItem) => {
    acc[cur['date']] = acc[cur['date']] || []
    acc[cur['date']].push(cur)
    return acc
  }, {})
}

const onChangeFilter = (filter_idx: number) => {
  filter.value = filter_idx
}

watch(
  [filter as Ref<number>, todos as Ref<TodoItem[]>],
  ([new_filter, new_todos], [old_filter, old_todos]) => {
    //console.log("Todo Item changed")
    pending_todos.value = getPendingTodos(new_todos)
    let temp_todos = filters[filter.value].func(new_todos)
    filtered_todos.value = groupBy(temp_todos)
    use_category.value = filters[filter.value].category

  },
  { immediate: true, deep: true }
)
</script>
