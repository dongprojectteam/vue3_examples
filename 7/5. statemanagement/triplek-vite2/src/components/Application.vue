<template>
  <p class="m-2">
    총 {{ applications_count }} 개의 어플리케이션 중
    {{ applications.length }}개가 보여집니다.
  </p>
  <hr />
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <div class="row row-cols-1 row-cols-sm-3 g-2 m-0">
    <div class="col" v-for="data in applications" :key="data.id">
      <app-card :data="data" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watchEffect } from 'vue'
//import { useStore } from 'vuex'
import { useApplications } from '/@compositions/useApplications'
import AppCard from '/@components/AppCard.vue'
import useAxios from '/@app_modules/axios.js'

export default {
  name: 'Application',
  setup() {
    const {
      applications,
      applications_count,
      setApplications,
    } = useApplications()
    const { axiosGet } = useAxios()
    onMounted(() => {
      if (!applications_count.value) {
        axiosGet('/db/applications', (data) => {
          setApplications(data.data)
        })
      }
    })

    return {
      applications_count,
      applications: applications(),
    }
  },
  components: {
    AppCard,
  },
}
</script>
