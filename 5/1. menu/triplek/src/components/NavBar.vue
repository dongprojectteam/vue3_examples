<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">TripleK</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul
          :class="{ 'navbar-nav': true, 'me-auto': menu.me_auto }"
          v-for="menu in menu_category"
          :key="menu.id"
        >
          <li class="nav-item" v-for="menu_object in menu.value" :key="menu_object.key">
            <a
              :class="{ 'nav-link': true, active: menu == menu_object.key }"
              @click="onMovePage($event, menu_object)"
              href="#"
              >{{ menu_object.value }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue'
export default {
  name: 'NavBar',
  setup() {
    const menu = ref('home')
    const menus = [
      { key: 'home', value: '홈', URL: '#', position: 'left' },
      { key: 'app', value: '애플리케이션', URL: '#', position: 'left' },
      { key: 'me', value: 'Profile', URL: '#', position: 'right' },
    ]

    const left_menus = computed(() => menus.filter((i) => i.position == 'left'))
    const right_menus = computed(() =>
      menus.filter((i) => i.position == 'right')
    )

    const onMovePage = (evt, menu_object) => {
      if (evt) {
        evt.preventDefault()
      }
      menu.value = menu_object.key
    }

    return {
      menu,
      menu_category: [
        {
          id: 1,
          me_auto: true,
          value: left_menus.value,
        },
        { id: 2, me_auto: false, value: right_menus.value },
      ],
      onMovePage,
    }
  },
}
</script>
