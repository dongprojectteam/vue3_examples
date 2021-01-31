import { axios } from '@bundled-es-modules/axios'

export default function () {
  const BASE_URL = 'http://localhost:8000'
  const axiosGet = (url, onSuccess = null, onFailed = null) => {
    const final_url = url.startsWith('http') ? url : BASE_URL + url
    axios.get(final_url).then((resp) => {
      if (resp.status === 200 && resp.data.rsp === 'ok') {
        if (onSuccess) {
          onSuccess(resp.data)
        }
      } else {
        if (onFailed) {
          onFailed(resp.data)
        }
      }
    })
  }

  return {
    axiosGet,
  }
}
