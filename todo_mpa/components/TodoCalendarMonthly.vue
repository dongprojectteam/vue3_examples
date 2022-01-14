<template>
  <div id="calendar_monthly" class="mt-3" v-if="cell_info.length > 0">
    <div class="row">
      <div
        class="col border border-silver border-bottom-0 p-2"
        :class="{ 'border-end-1': col == 6, 'border-end-0': col != 6 }"
        v-for="col in Array(7).keys()"
        :key="col"
      >
        <div
          class="d-flex align-items-center flex-column fw-bold"
          :class="{ 'text-danger': col == 0, 'text-primary': col == 6 }"
        >
          {{ days[col] }}
        </div>
      </div>
    </div>
    <div class="row" v-for="row in Array(cal_info.rows).keys()" :key="row">
      <div
        class="col border border-silver p-0"
        :class="{
          'border-end-1': col == 6,
          'border-end-0': col != 6,
          'border-bottom-1': row == cal_info.rows - 1,
          'border-bottom-0': row != cal_info.rows - 1,
        }"
        v-for="col in Array(7).keys()"
        :key="row * 7 + col"
        style="height: 80px"
      >
        <div
          class="m-1"
          :class="{
            'text-secondary': !cell_info[row * 7 + col].in_month,
            'fw-bold': cell_info[row * 7 + col].in_month,
          }"
        >
          <div class="d-flex align-items-end flex-column">
            <span
              :class="{
                'badge rounded-pill bg-primary': isToday(
                  cell_info[row * 7 + col].date
                ),
              }"
              >{{ cell_info[row * 7 + col].date.getDate() }}</span
            >
          </div>
          <div class="">
            <span>
              <button
                class="badge bg-success ms-1"
                :ref="
                  (el) => {
                    if (el) completed_refs[row * 7 + col] = el as Element
                  }
                "
                v-if="cell_info[row * 7 + col].completed.length > 0"
              >
                {{ cell_info[row * 7 + col].completed.length }}
              </button>
            </span>
            <span>
              <button
                :class="[
                  'badge',
                  'ms-1',
                  {
                    'bg-danger':
                      new Date(cell_info[row * 7 + col].date.toDateString()) <
                      new Date(new Date().toDateString()),
                    'bg-primary':
                      new Date(cell_info[row * 7 + col].date.toDateString()) >=
                      new Date(new Date().toDateString()),
                  },
                ]"
                :ref="
                  (el) => {
                    if (el) todos_refs[row * 7 + col] = el as Element
                  }
                "
                v-if="cell_info[row * 7 + col].todos.length > 0"
              >
                {{ cell_info[row * 7 + col].todos.length }}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'TodoCalendarMontly' }
</script>

<script setup lang="ts">
import { onBeforeUpdate, onUpdated, ref, watch } from '@vue/runtime-core'
import { CellItem, CalendarInfo } from '@todo_types/TodoCalendar'
import { TodoItem } from '@todo_types/TodoItem'
import { Popover } from 'bootstrap'
import { nextTick } from 'process'

const props = defineProps<{
  cal_info: CalendarInfo
  cell_info: CellItem[]
  todos: TodoItem[]
}>()

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const completed_refs = ref<Element[]>([])
const todos_refs = ref<Element[]>([])

const isToday = (date: Date) => {
  return (
    date.getDate() == props.cal_info.today.getDate() &&
    date.getMonth() == props.cal_info.today.getMonth() &&
    date.getFullYear() == props.cal_info.today.getFullYear()
  )
}

// ---- PopOver
enum POType {
  completed,
  todos,
}
onBeforeUpdate(() => {
  completed_refs.value = []
  todos_refs.value = []
})

const createPopOverTemplate = (type: POType, date: Date) => {
  let headBgColor = 'bg-success'
  if (type == POType.todos) {
    if (date < new Date()) {
      headBgColor = 'bg-danger'
    } else {
      headBgColor = 'bg-primary'
    }
  }
  return `
    <div class="popover" role="tooltip"><div class="popover-arrow"></div><p class="popover-header ${headBgColor} text-white"></p><div class="popover-body p-0"></div></div>
  `
}

const createContent = (type: POType, todos: TodoItem[]) => {
  let ret: string = '<ol class="list-group list-group-numbered m-0">'
  for (const item in todos) {
    ret += `
      <li class="list-group-item d-flex align-items-start">
        <div class="ms-2 w-100" >
          <div class="fw-bold">${todos[item].date}</div>
          <span class="text-wrap">${todos[item].job}</span>
        </div>
      </li>
    `
  }
  ret += '</ol>'
  return ret
}

onUpdated(() => {
  nextTick(() => {
    for (const key in completed_refs.value) {
      const cpopover = new Popover(completed_refs.value[key], {
        html: true,
        trigger: 'focus',
        title: 'Completed',
        content: createContent(
          POType.completed,
          props.cell_info[key].completed
        ),
        template: createPopOverTemplate(
          POType.completed,
          props.cell_info[key].date
        ),
      })
    }
    for (const key in todos_refs.value) {
      const tpopover = new Popover(todos_refs.value[key], {
        html: true,
        trigger: 'focus',
        title: 'Todo (' + props.cell_info[key].todos.length + ')',
        content: createContent(POType.completed, props.cell_info[key].todos),
        template: createPopOverTemplate(
          POType.todos,
          props.cell_info[key].date
        ),
      })
    }
  })

  /*
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  )

  const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new Popover(popoverTriggerEl)
  })
  */
})
</script>
