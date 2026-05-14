import axios from "axios";
import useUserStore from "../stores/userStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const { token } = useUserStore.getState()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log('interceptors error', error.response.status)
    const orginalRequest = error.config
    if (error.response.status === 401) {
      try {
        const res = await api.get('auth/refresh-token')
        const newAccessToken = res.data.token
        useUserStore.setState({
          token: newAccessToken
        })

        orginalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        console.log('res', res)
        return api(orginalRequest)
      } catch (error) {
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default api;
