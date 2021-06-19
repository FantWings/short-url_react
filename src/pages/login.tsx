import styled from 'styled-components'
import { useState } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { AuthAPI } from '../utils/api'
import useLoginCheck from '../hooks/useLoginCheck'

export default function Login() {
  useLoginCheck()
  const [isLoading, setLoading] = useState(false)
  const { logIn } = AuthAPI()

  const handleLogin = async (form: any) => {
    setLoading(true)
    await logIn(form)
    setLoading(false)
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
          onFinish={handleLogin}
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
