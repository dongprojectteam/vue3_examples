<template>
  <section class="mb-5">
    <div class="container">
      <div class="row justify-content-center m-2">
        <div class="col border border-primary rounded">
          <input
            type="text"
            id="todo_input"
            class="form-control my-2"
            v-model="job"
            placeholder="여기에 할일을 적으세요"
          />

          <div class="row my-2">
            <div class="col-6">
              <input type="date" v-model="date" :min="today" />
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn btn-primary btn-sm float-end"
                @click="onAddTodo"
              >
                작업추가
              </button>
              <span
                class="btn btn-sm material-icons-outlined float-end mx-2"
                :class="{
                  'text-danger': loop.type != LoopType.None && loop.cnt > 0,
                  'text-secondary': loop.type == LoopType.None,
                }"
                data-bs-toggle="modal"
                data-bs-target="#loopModal"
              >
                loop
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Modal -->
  <div class="modal fade" id="loopModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h6 class="modal-title text-white">반복 주기 설정</h6>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <div class="list-group">
                <button
                  type="button"
                  class="list-group-item list-group-item-action"
                  :class="{ active: loop.type == LoopType.None }"
                  @click=";(loop.type = LoopType.None) || (loop.cnt = 0)"
                >
                  반복 없음
                </button>
                <button
                  type="button"
                  class="list-group-item list-group-item-action"
                  :class="{ active: loop.type == LoopType.Day }"
                  @click="loop.type = LoopType.Day"
                >
                  매일 반복
                </button>
                <button
                  type="button"
                  class="list-group-item list-group-item-action"
                  :class="{ active: loop.type == LoopType.Week }"
                  @click="loop.type = LoopType.Week"
                >
                  주간 반복
                </button>
                <button
                  type="button"
                  class="list-group-item list-group-item-action"
                  :class="{ active: loop.type == LoopType.Month }"
                  @click="loop.type = LoopType.Month"
                >
                  월간 반복
                </button>
              </div>
            </div>
            <div class="col">
              <div class="input-group">
                <span class="input-group-text">반복 횟수</span>
                <input
                  type="text"
                  class="form-control"
                  v-model="loop.cnt"
                  :disabled="loop.type == LoopType.None"
                  @input="onChangeLoopCnt"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'TodoListNew' }
</script>

<script setup lang="ts">
import { reactive, toRefs, inject, ref } from 'vue'
import { TodoItem } from '@todo_types/TodoItem'
import { LoopType } from '@todo_types/Loop'
import { useDate } from '@todo_compositions/useDate'

const today = inject('today') as string
const addTodo = inject('addTodo') as (job: string, date: string) => void
const addTodos = inject('addTodos') as (
  new_todos: TodoItem[],
  callback: (result: boolean) => void
) => void
const val_obj = reactive<TodoItem>({
  job: '',
  date: today,
  completed: false,
  loop: LoopType.None,
  loop_id: 0,
})

const { makeDateString, addDay, addWeek, addMonth } = useDate()

const onAddTodo = () => {
  if (val_obj.job.length > 0) {
    if (loop.value.cnt == 0) {
      addTodo(val_obj.job, val_obj.date)
      val_obj.job = ''
      val_obj.date = today
    } else {
      const todos = ref<TodoItem[]>([])
      const base_date = new Date(val_obj.date)
      const loop_id: number = new Date().getTime()
      for (let i = 0; i < loop.value.cnt; i++) {
        let date = new Date()
        if (loop.value.type == LoopType.Day) {
          date = addDay(base_date, i)
        } else if (loop.value.type == LoopType.Week) {
          date = addWeek(base_date, i)
        } else if (loop.value.type == LoopType.Month) {
          date = addMonth(base_date, i)
        }
        todos.value.push({
          job: val_obj.job,
          completed: false,
          date: makeDateString(date),
          loop: loop.value.type,
          loop_id: loop_id,
        })
      }
      addTodos(todos.value, (result: boolean) => {
        if (result) {
          loop.value.cnt = 0
          loop.value.type = LoopType.None
          val_obj.job = ''
          val_obj.date = today
        }
      })
    }
  }
}

// -- 반복 주기
class Loop {
  type: LoopType = LoopType.None
  cnt: number = 0
}

const loop = ref<Loop>(new Loop())

const onChangeLoopCnt = () => {
  if (loop.value.cnt > 30) {
    loop.value.cnt = 30
  }
}

const { job, date } = toRefs(val_obj)
</script>
