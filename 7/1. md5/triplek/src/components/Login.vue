<template>
  <div class="d-flex text-center mt-md-5">
    <main class="form-signin">
      <form @submit="onSubmit">
        <h1 class="h3 mb-3 fw-normal">
          {{ is_login_form ? '로그인 하세요' : '비밀번호 업데이트' }}
        </h1>
        <small class="text-danger" v-if="invalid == 'no_email'"
          >이메일이 존재하지 않습니다.</small
        >
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          autocomplete="username"
          required
          ref="ref_email"
          v-model="email"
        />
        <small class="text-danger" v-if="invalid == 'wrong_password'"
          >비밀번호가 틀렸습니다.</small
        >
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
          v-model="password"
        />
        <div v-if="!is_login_form">
          <small class="text-danger" v-if="invalid == 'diff_passwords'"
            >새로운 비밀번호가 다릅니다.</small
          >
          <small class="text-danger" v-if="invalid == 'invalid_password'"
            >해당 비밀번호는 사용할 수 없습니다.</small
          >

          <input
            type="password"
            id="inputPasswordNew1"
            class="form-control"
            :class="{ 'is-invalid': invalid == 'diff_passwords' }"
            placeholder="New Password"
            autocomplete="new-password"
            required
            v-model="new_password1"
          />
          <input
            type="password"
            id="inputPasswordNew2"
            class="form-control"
            :class="{ 'is-invalid': invalid == 'diff_passwords' }"
            placeholder="New Password"
            autocomplete="new-password"
            required
            v-model="new_password2"
          />
        </div>
        <div class="m-3"></div>
        <div class="checkbox mb-3" v-if="is_login_form">
          <input type="checkbox" v-model="stay" /> 로그인 유지하기
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          {{ !is_login_form ? '변경하기' : '입장하기' }}
        </button>
        <p class="mt-5 mb-3 text-muted">오직 관리자만 입장할 수 있습니다.</p>
      </form>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import useLogin from '/@app_modules/login.js'
import { getCookie, setCookie } from '/@app_modules/cookie.js'
export default {
  props: {
    email: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'login',
    },
  },
  emits: ['state'],
  setup(props, context) {
    const ref_email = ref(null)
    const stay = ref(false)
    const is_login_form = ref(props.type == 'login')
    const email = ref(props.email)
    const password = ref('')
    const new_password1 = ref('')
    const new_password2 = ref('')
    const invalid = ref('ok')
    const { updatePassword, login } = useLogin()

    stay.value = getCookie('stay') == 'true'

    const onSubmit = (evt) => {
      if (evt) {
        evt.preventDefault()
      }
      invalid.value = 'ok'
      if (is_login_form.value) {
        // 로그인 Form
        login(email.value, password.value)
          .then((data) => {
            setCookie('email', email.value)
            setCookie('token', data.token)

            if (stay.value) {
              setCookie('stay', 'true')
            } else {
              setCookie('stay', 'false')
              setCookie('token', '')
            }

            context.emit('state')
          })
          .catch((data) => {
            invalid.value = data.rsp
          })
      } else {
        if (new_password1.value != new_password2.value) {
          invalid.value = 'diff_passwords'
          new_password1.value = new_password2.value = ''
        } else if (new_password1.value == 'vue') {
          invalid.value = 'invalid_password'
          new_password1.value = new_password2.value = ''
        } else {
          updatePassword(email.value, password.value, new_password1.value)
            .then((data) => {
              password.value = new_password1.value = new_password2.value = ''
              is_login_form.value = true
            })
            .catch((data) => {
              invalid.value = data.rsp
            })
        }
      }
    }

    onMounted(() => {
      ref_email.value.focus()
    })

    return {
      is_login_form,
      ref_email,
      email,
      password,
      new_password1,
      new_password2,
      onSubmit,
      invalid,
      stay,
    }
  },
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin > .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin > input[type='password'] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
