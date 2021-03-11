<template>
  <div v-if="state == 'ok'">
    <div class="row text-end pe-sm-2">
      <small><a href="#" @click="onLogout">Logout</a></small>
    </div>
  </div>
  <div v-else-if="state == 'loading'">Loading...</div>
  <login v-else :email="email" :type="state" @state="state = 'ok'" />
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import Login from '/@components/Login.vue'
import { getCookie, setCookie } from '/@app_modules/cookie.js'
import useLogin from '/@app_modules/login.js'
export default {
  setup() {
    const state = ref('loading')
    const email = ref(getCookie('email'))
    const token = ref(getCookie('token'))

    onBeforeMount(() => {
      const { checkToken } = useLogin()
      const auto_login = getCookie('stay') == 'true'

      email.value = email.value == '' ? 'test-email' : email.value
      token.value = token.value == '' ? 'test-token' : token.value

      // 저장된 토큰 혹은 테스트 토큰을 이용하여 정보를 얻어온다.
      checkToken(email.value, token.value)
        .then((data) => {
          if (data.data == 'vue') {
            state.value = 'update'
            email.value = ''
          } else if (auto_login) {
            // 이미 로그인이 완료되었다.
            state.value = 'ok'
          } else {
            state.value = 'login'
          }
        })
        .catch((e) => {
          state.value = 'login'
        })
    })

    const onLogout = (evt) => {
      if (evt) {
        evt.preventDefault()
      }
      setCookie('token', '')
      state.value = 'login'
    }

    return { state, email, onLogout }
  },
  components: { Login },
}
</script>
