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
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, toRefs, inject, ref } from 'vue'

export default {
  name: 'TodoListNew',
  setup() {
    const today = inject('today')
    const addTodo = inject('addTodo')
    const val_obj = reactive({
      job: '',
      date: today,
      today: today,
    })

    const onAddTodo = () => {
      if (val_obj.job.length > 0) {
        addTodo(val_obj.job, val_obj.date)
        val_obj.job = ''
        val_obj.date = today
      }
    }

    return {
      ...toRefs(val_obj),
      onAddTodo,
    }
  },
}
</script>
