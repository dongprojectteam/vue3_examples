<template>
  <div
    class="card h-100 border-2"
    :class="{ 'border-primary': selected_appl_id == data.id }"
  >
    <img :src="data.image" class="card-img-top" alt="Image" />
    <div class="card-body">
      <h5 class="card-title">{{ data.name }}</h5>
      <p class="card-text">
        {{ data.content }}
      </p>
      <p class="card-text" v-if="data.url != 'null'">
        <a :href="data.url" @click="onClickApplication(data)" target="_blank"
          >클릭</a
        >
      </p>
    </div>
    <div class="card-footer">
      <small class="text-muted">{{ data.date }}에 등록 됨</small>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    data: Object,
  },
  setup(props) {
    const data = props.data
    const selected_appl_id = ref(-1)

    const onClickApplication = (one_data) => {
      selected_appl_id.value = one_data.id
    }

    return { data, onClickApplication, selected_appl_id }
  },
}
</script>
