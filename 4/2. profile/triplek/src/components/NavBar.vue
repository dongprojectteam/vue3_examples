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
            <a
              :class="{ 'nav-link': true, active: menu == o.key }"
              @click="onMovePage($event, o)"
              href="#"
              >{{ o.value }}</a
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
    const menu = ref('profile')
    const menus = [
      { key: 'home', value: '홈', url: '#', position: 'left' },
      { key: 'app', value: '어플리케이션', url: '#', position: 'left' },
      { key: 'profile', value: 'Profile', url: '#', position: 'right' },
    ]

    const left_menus = computed(() => menus.filter((i) => i.position == 'left'))
    const right_menus = computed(() =>
      menus.filter((i) => i.position == 'right')
    )

    const onMovePage = (evt, o) => {
      if (evt) {
        evt.preventDefault()
      }
      menu.value = o.key
    }

    return {
      menu,
      menu_category: [
        {
          mr_auto: true,
          value: left_menus.value,
        },
        { mr_auto: false, value: right_menus.value },
      ],
      onMovePage,
    }
  },
}
</script>
