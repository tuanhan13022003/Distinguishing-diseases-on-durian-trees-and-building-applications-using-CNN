import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElement } from '~/utils/formatters'
// import { refreshTokenAPI } from '~/apis'
// import { logoutUserAPI } from '~/redux/user/userSlice'

// let axiosReduxStore
// export const injectStore = mainStore => {
//   axiosReduxStore = mainStore
// }

const authorizedAxiosInstance = axios.create({
  headers: {
    'ngrok-skip-browser-warning': '69420'
  },
  timeout: 30000
})

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizedAxiosInstance.defaults.withCredentials = true

authorizedAxiosInstance.interceptors.request.use((config) => {
  interceptorLoadingElement(true)
  return config
}, (error) => {

  return Promise.reject(error)
})

//Axios interceptor refresh token
// let refreshTokenPromise = null

authorizedAxiosInstance.interceptors.response.use((response) => {
  interceptorLoadingElement(false)
  return response
}, (error) => {
  interceptorLoadingElement(false)

  // if (error.response?.status === 401) {
  //   axiosReduxStore.dispatch(logoutUserAPI(false))
  // }

  // const originalRequests = error.config
  // if (error.response?.status === 410 && !originalRequests._retry) {
  //   originalRequests._retry = true

  //   if (!refreshTokenPromise) {
  //     refreshTokenPromise = refreshTokenAPI()
  //       .then(data => {
  //         return data?.accessToken
  //       })
  //       .catch((error) => {
  //         axiosReduxStore.dispatch(logoutUserAPI(false))
  //         return Promise.reject(error)
  //       })
  //       .finally(() => {
  //         refreshTokenPromise = null
  //       })
  //   }

  //   return refreshTokenPromise.then((accessToken) => {
  //     return authorizedAxiosInstance(originalRequests)
  //   })
  // }

  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response.data.message
  }
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }

  return Promise.reject(error)
})

export default authorizedAxiosInstance