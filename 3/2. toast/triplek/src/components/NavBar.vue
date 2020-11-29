<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">TripleK</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul
          :class="{ 'navbar-nav': true, 'mr-auto': m.mr_auto }"
          v-for="(m, idx_1) in menu_category"
          :key="idx_1"
        >
          <li class="nav-item" v-for="(o, idx_2) in m.value" :key="idx_2">
            <router-link :to="o.url" class="nav-link">{{
              o.value
            }}</router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-show="notification.id > 0">
          <li class="nav-item">
            <button type="button" class="btn" @click="onOpenNotification">
              &#x1F514;
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <teleport to="#notification" v-if="show_notification">
    <div
      :class="
        'container notification border border-dark rounded-3 mt-3 p-3 bg-' +
        notification.type
      "
    >
      <div v-if="notification.type" class="d-flex">
        <span class="mr-auto fs-4 fw-bold text-uppercase text-light">
          {{ notification.type }}
        </span>
        <button type="button" class="btn fw-bold" @click="onCloseNotification">
          &times;
        </button>
      </div>
      <hr />
      <div class="text-light text-wrap">{{ notification.content }}</div>
    </div>
  </teleport>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import useAxios from '/@compositions/axios.js'
import { setCookie, getCookie } from '/@utils/cookie.js'
export default {
  name: 'NavBar',
  setup() {
    let notification = reactive({ id: 0 })
    const show_notification = ref(false)
    const menus = [
      { key: 'home', value: '홈', url: '/home', position: 'left' },
      {
        key: 'app',
        value: '어플리케이션',
        url: '/application',
        position: 'left',
      },
      { key: 'profile', value: 'Profile', url: '/profile', position: 'right' },
      { key: 'admin', value: 'Admin', url: '/admin', position: 'right' },
    ]

    const left_menus = computed(() => menus.filter((i) => i.position == 'left'))
    const right_menus = computed(() =>
      menus.filter((i) => i.position == 'right')
    )

    const onOpenNotification = (evt) => {
      if (evt) {
        evt.preventDefault()
      }

      show_notification.value = !show_notification.value
    }

    const onCloseNotification = (evt) => {
      if (evt) {
        evt.preventDefault()
      }

      setCookie('notification', notification.id, 1)
      notification.id = 0
      show_notification.value = false
    }

    onMounted(() => {
      const block_noti_id = getCookie('notification') || 0
      const { axiosGet } = useAxios()
      axiosGet(`/db/notification/${block_noti_id}`, (data) => {
        Object.assign(notification, data.data)
      })
    })

    return {
      notification,
      show_notification,
      onOpenNotification,
      onCloseNotification,
      menu_category: [
        {
          mr_auto: true,
          value: left_menus.value,
        },
        { mr_auto: false, value: right_menus.value },
      ],
    }
  },
}
</script>

<style scope>
.notification {
  text-shadow: 2px 2px 2px gray;
}
</style>
