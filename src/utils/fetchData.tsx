import { message } from 'antd'

/**
 * Fetch封装 -
 * API需要返回以下JSON格式：
 * { code=状态码, msg=消息, data=数据体 }
 * @param {string} url 请求地址
 * @param {object} config fetch高级配置
 * @param {funcion} setLoading Hooks设置加载状态的回调
 * @return {object} data 数据体
 */

export const fetchData = async (url: string, config: object, setLoading?: Function | false) => {
  if (setLoading) setLoading(true)

  try {
    const response = await fetch(url, config)
    const { ok, status } = response

    if (!ok) {
      switch (status) {
        case 400:
          message.error('请求包含语法错误或无法完成请求！')
          break
        case 404:
          message.error('请求的资源未找到！')
          break
        case 500:
          message.error('服务器在处理请求的过程中发生了错误')
          break
        default:
          message.error('未知错误，请求失败')
      }
    } else {
      const { code, msg, data } = await response.json()
      if (setLoading) setLoading(false)
      switch (code) {
        case 0:
          if (msg) message.success(msg)
          return data
        case 10:
          localStorage.clear()
          message.warning(msg)
          break
        default:
          message.error(msg)
          break
      }
    }
  } catch (error) {
    if (setLoading) setLoading(false)
    message.error(`接口请求失败，请检查网络连接，如果问题依然存在，请联系管理员！${error}`)
  }
}
