<template>
  <div class="bg-primary text-light d-flex justify-content-center">
    <p class="m-1"><b>DOPT TODO Application</b></p>
  </div>
  <div class="p-3">
    <div class="d-flex justify-content-between">
      <nav style="--bs-breadcrumb-divider: '>'" class="m-0">
        <ol class="breadcrumb m-0">
          <li class="breadcrumb-item">
            <a href="https://www.doptsw.com/">Home</a>
          </li>
          <li class="breadcrumb-item active">Todo Application</li>
        </ol>
      </nav>
      <div v-if="facebook_status == 'connected'" style="font-size: 0.5rem">
        {{ userid }}
      </div>
    </div>
    <hr />

    <div
      v-show="
        facebook_status == 'unknown' || facebook_status == 'not_authorized'
      "
      class="fb-login-button"
      data-width
      data-size="medium"
      data-button-type="login_with"
      data-layout="default"
      data-auto-logout-link="false"
      data-use-continue-as="true"
      onlogin="onLoggedIn()"
    ></div>

    <div
      v-if="facebook_status == 'unknown' || facebook_status == 'not_authorized'"
    >
      Facebook 연동 시, 서버에 데이터를 저장합니다.
    </div>
  </div>

  <div class="container">
    <header class="my-5">
      <h1>
        DOPT
        <span class="text-danger">Todo</span> Application
      </h1>
      <em>Today: {{ today }}</em>
    </header>
  </div>
  <TodoListContainer :logged_in="logged_in" :userid="userid" />

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <footer class="text-center mt-5 p-3">
    <hr />
    <div
      class="fb-like"
      data-href="https://www.doptsw.com/todo"
      data-width
      data-layout="button"
      data-action="like"
      data-size="small"
      data-share="true"
    ></div>
    <div class="footer_message">
      <p class="my-0">
        본 애플리케이션은 Facebook 로그인 시 Facebook userid 만 활용합니다.
      </p>
      <p class="my-0">
        Facebook userid 를 제외한 모든 다른 정보는 일체 수집/활용하지 않습니다.
      </p>
      <p class="my-0">
        개인정보 약관을 열람하시기 위해서는
        <a href="https://www.doptsw.com/privacy">여기</a>를 클릭해주세요.
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
export default { name: 'TODO App' }
</script>

<script setup lang="ts">
declare global {
  interface Window {
    onLoggedIn: () => void
  }
}

import { inject, ref, onMounted } from 'vue'
import TodoListContainer from './components/TodoListContainer.vue'
import { useFacebook } from '@compositions/useFacebook'
import { useCounter } from '@compositions/useCounter'

const today = inject('today')
const {
  initFacebookSdk,
  onFacebookLoggedIn,
  facebook_status,
  logged_in,
  userid,
} = useFacebook()

initFacebookSdk()

const { countMe } = useCounter()

onMounted(() => {
  window.onLoggedIn = onFacebookLoggedIn
  countMe('TODO')
})
</script>

<style scoped>
/*
header {
  text-align: center;
  font-family: 'Arial Bold';
}
*/
header {
  text-align: left;
  font-family: Verdana, sans-serif;
  padding-left: 16px;
  border-left: 10px solid #0d6efd;
}

header h1 {
  font-weight: bolder;
}

.footer_message {
  font-size: 10px;
}
</style>
