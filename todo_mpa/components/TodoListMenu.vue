<template>
  <div class="row">
    <div class="col">
      <span style="background-color: blue">&nbsp;</span>&nbsp;
      <strong>{{ state }}</strong>
    </div>
    <div class="col">
      <div class="btn-group float-end">
        <button class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">리스트 필터</button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="(key, index) in filters" :key="index">
            <a class="dropdown-item" @click="filter = index">{{ filters[index].str }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "TodoListMenu" };
</script>

<script setup lang="ts">
import { ref, watch, computed, inject } from "vue";
import { FilterMenu } from '@todo_types/TodoItem'
const emit = defineEmits<{
  (e: 'change-filter', filter: number): void
}>()
const filters = inject("filters") as FilterMenu[]
const filter = ref(0);
const state = computed(() => {
  return filters[filter.value].str;
});

watch(
  () => filter.value,
  (filter) => {
    emit("change-filter", filter);
  }
);
</script>
