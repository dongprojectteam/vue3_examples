import { ref } from 'vue'
export default function () {
  const called = ref(0)
  const call = () => {
    called.value++
    console.log(called.value)
  }

  const call2 = () => {
    called.value++
    console.log(called.value)
  }

  return {
    call,
    call2,
  }
}
