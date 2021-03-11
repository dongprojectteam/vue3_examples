<template>
  <p class="m-2">
    총 {{ applications_count }} 개의 어플리케이션 중
    {{ applications.length }}개가 보여집니다.
  </p>
  <hr />
  <div class="row row-cols-1 row-cols-sm-3 g-2 m-0">
    <div class="col" v-for="data in applications" :key="data.id">
      <app-card :data="data" />
    </div>
  </div>
</template>

<script>
import { provide, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import AppCard from '/@components/AppCard.vue'
import useAxios from '/@app_modules/axios.js'

export default {
  name: 'Application',
  setup() {
    const store = useStore()
    const { axiosGet } = useAxios()
    const applications = computed(() =>
      store.getters['applications/applications']()
    )

    const applications_count = computed(
      () => store.getters['applications/applications_count']
    )

    

    

    onMounted(() => {
      if (!store.getters.applications_count) {
        axiosGet('/db/applications', (data) => {
          store.dispatch('applications/setApplications', data.data)
        })
      }
    })

    return {
      applications_count,
      applications,
    }
  },
  components: {
    AppCard,
  },
}
</script>
