<template>
  <div class="container">
    <header>
      <h1>
        {{ title }}
        <span class="material-icons-outlined me-2">calendar_today</span>
      </h1>
    </header>

    <div id="calendar" class="mt-5">
      <div class="d-flex justify-content-between">
        <div>
          <button
            class="btn btn-sm btn-outline-dark border-0 py-0"
            @click="onChangeMonth(-1)"
          >
            <span class="material-icons-outlined" style="font-size: 18px"
              >chevron_left</span
            >
          </button>
          <input
            class="mx-2 form-control-sm m-0"
            type="month"
            v-model="cal_info.date_month"
          />
          <button
            class="btn btn-sm btn-outline-dark border-0 py-0"
            @click="onChangeMonth(1)"
          >
            <span class="material-icons-outlined" style="font-size: 18px"
              >chevron_right</span
            >
          </button>
        </div>

        <button class="btn btn-sm btn-outline-dark d-flex" @click="onThisMonth">
          <span
            class="material-icons-outlined me-2 my-0"
            style="font-size: 23px"
            >today</span
          >This month
        </button>
        <!--
        <div class="btn-group">
          <button class="btn btn-sm btn-outline-dark">Day</button>
          <button class="btn btn-sm btn-outline-dark">Week</button>
          <button class="btn btn-sm btn-outline-dark">Month</button>
        </div>
        -->
      </div>
    </div>
    <TodoCalendarMonthly
      :cell_info="cell_info"
      :cal_info="cal_info"
      :todos="todos"
    />
  </div>
</template>
<script lang="ts">
export default { name: 'TodoCalendar' }
</script>

<script setup lang="ts">
import { ref, watch, reactive, onMounted } from 'vue'
import { CellItem, CalendarInfo } from '@todo_types/TodoCalendar'
import { TodoItem } from '@todo_types/TodoItem'
import TodoCalendarMonthly from './TodoCalendarMonthly.vue'
import { useDate } from '@todo_compositions/useDate'

interface Props {
  title?: string
  todos: TodoItem[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Calendar',
  todos: () => [] as TodoItem[],
})

const { makeDateString } = useDate()

const cell_info = ref<CellItem[]>([])
const cal_info = reactive<CalendarInfo>({
  rows: 6,
  today: new Date(),
  this_month: '',
  date_month: '',
})

cal_info.today = new Date()
cal_info.this_month = cal_info.date_month =
  cal_info.today.getFullYear() +
  '-' +
  String(cal_info.today.getMonth() + 1).padStart(2, '0')

watch(props, (n) => {
  onCreateMonthCal()
})

const onCreateMonthCal = () => {
  cell_info.value = []
  const date = new Date(cal_info.date_month)
  const first_day_of_week = date.getDay()
  for (const dow in [...Array(first_day_of_week).keys()]) {
    const cell: CellItem = {
      date: new Date(date),
      in_month: false,
      completed: [],
      todos: [],
    }
    cell.date.setDate(date.getDate() - (first_day_of_week - Number(dow)))
    cell_info.value.push(cell)
  }

  const end_of_month = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  for (let i = 1; i <= end_of_month.getDate(); i++) {
    const cell: CellItem = {
      date: new Date(date.getFullYear(), date.getMonth(), i),
      in_month: true,
      completed: [],
      todos: [],
    }
    cell_info.value.push(cell)
  }

  const more = 7 - ((cell_info.value.length + 7) % 7)
  for (let i = 1; i <= more; i++) {
    end_of_month.setDate(end_of_month.getDate() + 1)
    const cell: CellItem = {
      date: new Date(end_of_month),
      in_month: false,
      completed: [],
      todos: [],
    }
    cell_info.value.push(cell)
  }

  cal_info.rows = cell_info.value.length / 7

  cell_info.value.map((cell) => {
    let c = cell
    c.completed = props.todos.filter(
      (todo) => todo.date == makeDateString(cell.date) && todo.completed
    )
    c.todos = props.todos.filter(
      (todo) => todo.date == makeDateString(cell.date) && !todo.completed
    )

    return c
  })
}

const onChangeMonth = (delta: number) => {
  const cur_month = new Date(cal_info.date_month)
  cur_month.setMonth(cur_month.getMonth() + delta)
  cal_info.date_month = cur_month.toISOString().split('T')[0].slice(0, 7)

  onCreateMonthCal()
}

const onThisMonth = () => {
  cal_info.date_month = cal_info.this_month
  onCreateMonthCal()
}
</script>
<style scoped>
header {
  text-align: left;
  font-family: Verdana, sans-serif;
  padding-left: 16px;
  border-left: 10px solid #0d6efd;
}
header h1 {
  font-weight: bolder;
}
</style>
