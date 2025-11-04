import Taro from '@tarojs/taro'

const API_BASE_URL = process.env.TARO_APP_API_BASE_URL || 'http://localhost:8080'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: any
}

class Request {
  private baseURL: string = API_BASE_URL
  private getToken(): string { return Taro.getStorageSync('token') || '' }
  async request<T>(options: RequestOptions): Promise<T> {
    const { url, method = 'GET', data, header = {} } = options
    const token = this.getToken()
    const defaultHeader = { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' }
    try {
      const response = await Taro.request({ url: `${this.baseURL}${url}`, method, data, header: { ...defaultHeader, ...header } })
      if (response.statusCode === 200) {
        const result: any = response.data
        if (result.code === 200) { return result.data }
        Taro.showToast({ title: result.msg || '请求失败', icon: 'none' })
        throw new Error(result.msg)
      } else if (response.statusCode === 401) {
        Taro.removeStorageSync('token'); Taro.navigateTo({ url: '/pages/login/index' }); throw new Error('未授权')
      } else { throw new Error('网络错误') }
    } catch (error: any) {
      Taro.showToast({ title: error.message || '网络请求失败', icon: 'none' }); throw error
    }
  }
  get<T>(url: string, data?: any) { return this.request<T>({ url, method: 'GET', data }) }
  post<T>(url: string, data?: any) { return this.request<T>({ url, method: 'POST', data }) }
  put<T>(url: string, data?: any) { return this.request<T>({ url, method: 'PUT', data }) }
  delete<T>(url: string, data?: any) { return this.request<T>({ url, method: 'DELETE', data }) }
  async uploadFile(filePath: string): Promise<string> {
    const token = this.getToken()
    try {
      const result = await Taro.uploadFile({ url: `${this.baseURL}/api/upload/image`, filePath, name: 'file', header: { Authorization: token ? `Bearer ${token}` : '' } })
      const data = JSON.parse(result.data)
      if (data.code === 200) { return data.data.url } else { throw new Error(data.msg) }
    } catch (error: any) { Taro.showToast({ title: error.message || '上传失败', icon: 'none' }); throw error }
  }
}
export default new Request()