import useAxios from '/@compositions/axios.js'
const { axiosPut, axiosPost } = useAxios()

export default function () {
  const checkToken = (email, token) =>
    new Promise((resolve, reject) => {
      axiosPost(
        `/db/accounts/check-token/${email}/${token}`,
        {},
        (data) => {
          resolve(data)
        },
        (data) => {
          reject(data)
        }
      )
    })

  const updatePassword = (email, password, oldpassword) =>
    new Promise((resolve, reject) => {
      axiosPut(
        `/db/accounts/${email}/${password}/${oldpassword}`,
        {},
        (data) => {
          resolve(data)
        },
        (data) => {
          reject(data)
        }
      )
    })

  const login = (email, password) =>
    new Promise((resolve, reject) => {
      axiosPost(
        `/db/accounts/login/${email}/${password}`,
        {},
        (data) => {
          resolve(data)
        },
        (data) => {
          reject(data)
        }
      )
    })

  return {
    checkToken,
    updatePassword,
    login,
  }
}
