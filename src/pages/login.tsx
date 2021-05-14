import { useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { fetchData } from '../common/fetchData'
// import { useHistory } from 'react-router'

export default function Login() {
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState({})
  // const history = useHistory()

  const onFinish = (values: any) => {
    const login = async () => {
      await fetchData(
        `http://127.0.0.1:5000/auth/signIn`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email: values.username,
            passowrd: values.password,
          }),
          mode: 'cors',
        },
        setLoading,
        setData
      )
    }
    login()
    console.log(data)
  }

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo)
    notification['error']({
      message: '错误',
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
            <Checkbox>记住我</Checkbox>
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
