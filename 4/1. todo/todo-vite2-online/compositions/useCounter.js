import axios from 'axios'
import { useDomain } from '@compositions/useDomain'

export const useCounter = () => {
  const { getURL } = useDomain()
  const url = getURL()
  const appUrl = `${url.value}/api/counter`
  const newCounter = async (data) => {
    let request = {
      url: appUrl,
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      data: JSON.stringify(data),
    }
    const response = await axios(request)
    return response
  }

  const countMe = async () => {
    newCounter({
      date: '2021-10-11',
      count: 1,
      ip: '127.0.0.1',
      country: '',
      country_code: '',
      app: 'TODO',
    })
  }

  return {
    countMe,
  }
}
