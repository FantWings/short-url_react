import { fetchData } from './fetchData'
import { useHistory } from 'react-router'

const baseURL = 'http://127.0.0.1:5000'

const apiAuth = `${baseURL}/auth`
const apiUser = `${baseURL}/user`
const apiUrl = `${baseURL}/url`

//Url API
export const apiUrlGet = `${apiUrl}/getLists`
export const apiUrlAdd = `${apiUrl}/add`
export const apiUrlDelete = `${apiUrl}/delete`
export const apiUrlUpdate = `${apiUrl}/update`

// 验证
export function AuthAPI() {
  const history = useHistory()

  // 登录函数
  const logIn = async (form: any) => {
    const data: { token: string } = await fetchData(
      `${apiAuth}/signIn`,
      'POST',
      {},
      {
        email: form.username,
        password: form.password,
      }
    )
    if (data) localStorage.setItem('sessionToken', data.token)
    history.push('/admin')
  }

  // 登出函数
  const logOut = async () => {
    await fetchData(`${apiAuth}/signOut`, 'DELETE', {
      token: localStorage.getItem('sessionToken'),
    })
    history.push('/login')
  }
  return { logIn, logOut }
}

// 用户
export function UserAPI() {
  // 获取用户信息
  const getUserInfo = () => {
    return fetchData(`${apiUser}/userInfo`, 'GET', { token: localStorage.getItem('sessionToken') })
  }

  // 更新用户信息
  const updateUserInfo = (target: string, content: string) => {
    fetchData(
      `${apiUser}/userUpdate?target=${target}`,
      'POST',
      { token: localStorage.getItem('sessionToken') },
      { content }
    )
  }

  return { getUserInfo, updateUserInfo }
}
