import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { message, Avatar, Menu, Dropdown } from 'antd'
import { PieChartOutlined, DesktopOutlined, SettingOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { fetchData } from '../common/fetchData'
import { UserInfo } from '../common/interfaces'
import { Route, Switch } from 'react-router-dom'
import PageUrl from './panel/url'

export default function AdminPage() {
  const history = useHistory()
  const [data, setData] = useState<UserInfo>({
    email: '加载中',
  })

  // 获取登录态
  const [sessionToken] = useState(localStorage.getItem('sessionToken'))

  // 未登录跳转
  // if (!sessionToken) {
  //   message.warn('请重新登录！')
  //   history.replace('/login')
  // }

  useEffect(() => {
    const getUserInfo = async () => {
      await fetchData(
        `http://127.0.0.1:5000/user/userInfo`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            token: sessionToken,
          },
        },
        undefined,
        setData
      )
    }
    if (!sessionToken) {
      message.warn('请重新登录！')
      history.replace('/login')
    } else {
      getUserInfo()
    }
  }, [sessionToken, history])

  const handleSignOut = async () => {
    await fetchData(`http://127.0.0.1:5000/auth/signOut`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        token: localStorage.getItem('sessionToken'),
      },
      mode: 'cors',
    })
    history.replace('/login')
  }

  const avatarMenu = (
    <Menu>
      <Menu.Item>
        <LoginOutlined style={{ color: 'red' }} />
        <span onClick={handleSignOut}>退出登录</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Header>
        <h2 id={'title'}>短链接管理</h2>
        <Dropdown overlay={avatarMenu} placement="bottomRight" arrow>
          <div id={'userInfo'}>
            <Avatar size={32} icon={<UserOutlined />} style={{ margin: '0 8px' }} src={data.avatar} />
            <span>{data.email}</span>
          </div>
        </Dropdown>
      </Header>

      <Body>
        <div style={{ width: 256 }}>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="vertical"
            theme="dark"
            style={{ height: 'calc(100vh - 64px)', background: 'rgb(40,44,52)' }}
          >
            <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => history.push('/admin/dashboard')}>
              统计
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={() => history.push('/admin/url')}>
              URL管理
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />} onClick={() => history.push('/admin/settings')}>
              设置
            </Menu.Item>
          </Menu>
        </div>
        <div id={'container'}>
          <Switch>
            <Route path="/admin/profile" component={PageUrl} />
            <Route path="/admin/dashboard" component={PageUrl} />
            <Route path="/admin/url" component={PageUrl} />
            <Route path="/admin/settings" component={PageUrl} />
          </Switch>
        </div>
      </Body>
    </div>
  )
}

const Header = styled.div`
  background-color: rgb(40, 44, 52);
  color: #fff;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  #title {
    color: #fff;
    margin: 0 24px;
  }

  #userInfo {
    margin: 0 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: space-around;
  }
`

const Body = styled.div`
  display: flex;
  flex-wrap: nowrap;

  #container {
    margin: 16px;
  }
`
