import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { fetchData } from '../utils/fetchData'
import { sessionToken } from '../utils/interfaces'
import { useHistory } from 'react-router'
import { apiAuth } from '../utils/api'

export default function Login() {
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState<sessionToken>({
    token: localStorage.getItem('sessionToken'),
  })
  const history = useHistory()

  useEffect(() => {
    if (data.token) {
      localStorage.setItem('sessionToken', data.token)
      history.push('/admin')
    }
  })

  const onFinish = (values: any) => {
    const login = async () => {
      setData(
        await fetchData(
          `${apiAuth}/signIn`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              email: values.username,
              password: values.password,
              remember: values.remember,
            }),
            mode: 'cors',
          },
          setLoading
        )
      )
    }
    login()
  }

  const onFinishFailed = (errorInfo: any) => {
    notification['error']({
      message: '内容不正确',
      description: errorInfo.errorFields[0].errors,
    })
    setLoading(false)
  }
  return (
    <LoginContain>
      <SectionLogin>
        <h1 style={{ textAlign: 'center' }}>登录</h1>
        <Form
          name="basic"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="邮箱"
            name="username"
            rules={[
              { required: true, message: '请正确填写邮箱' },
              { type: 'email', message: '这不是一个有效的邮箱！' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请正确填写密码' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>7天内记住我</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </SectionLogin>
    </LoginContain>
  )
}

const LoginContain = styled.div`
  display: flex;
  background-color: rgb(40, 44, 52);
  height: 100%;
  justify-content: center;
  align-items: center;
`

const SectionLogin = styled.div`
  flex: 1;
  max-width: 450px;
  background-color: #fff;
  border-radius: 10px;
  padding: 35px;
`
