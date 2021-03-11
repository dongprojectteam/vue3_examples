import { axios } from '@bundled-es-modules/axios'
import { ref } from 'vue'

export default () => {
  const commuicating = ref(false)
  const BASE_URL = 'http://YOUR-EC2-DNS-OR-IP:8000'
  const creatURL = (url) => {
    return url.startsWith('http') ? url : BASE_URL + url
  }

  const checkResult = (resp, onSuccess, onFailed) => {
    commuicating.value = false
    if (resp.status === 200 && resp.data.rsp === 'ok') {
      if (onSuccess) {
        onSuccess(resp.data)
      }
    } else {
      if (onFailed) {
        onFailed(resp.data)
      }
    }
  }

  const axiosGet = async (url, onSuccess = null, onFailed = null) => {
    commuicating.value = true
    axios.get(creatURL(url)).then((resp) => {
      checkResult(resp, onSuccess, onFailed)
    })
  }

  const axiosPost = async (url, data, onSuccess = null, onFailed = null) => {
    commuicating.value = true
    axios.post(creatURL(url), data).then((resp) => {
      checkResult(resp, onSuccess, onFailed)
    })
  }

  const axiosPut = async (url, data, onSuccess = null, onFailed = null) => {
    commuicating.value = true
    axios.put(creatURL(url), data).then((resp) => {
      checkResult(resp, onSuccess, onFailed)
    })
  }

  return {
    commuicating,
    axiosGet,
    axiosPost,
    axiosPut,
  }
}
