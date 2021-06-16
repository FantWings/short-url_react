import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { message, Avatar, Menu, Dropdown } from 'antd'
import { PieChartOutlined, DesktopOutlined, SettingOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { fetchData } from '../utils/fetchData'
import { UserInfo } from '../utils/interfaces'
import { Route, Switch } from 'react-router-dom'
import PanelUrl from './Url'
import PanelDashboard from './Dashboard'
import PanelSettings from './Settings'

export default function AdminPage() {
  const history = useHistory()
  const [data, setData] = useState<UserInfo>({
    email: '加载中',
  })

  // 获取登录态
  const [sessionToken] = useState(localStorage.getItem('sessionToken'))

  useEffect(() => {
    const getUserInfo = async () => {
      setData(
        await fetchData(
          `http://127.0.0.1:5000/user/userInfo`,
          {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              token: sessionToken,
            },
          },
          undefined
        )
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
      <Menu.Item onClick={handleSignOut}>
        <span>
          <LoginOutlined style={{ color: 'red' }} />
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Header>
        <h2 id={'title'}>AdminPanel</h2>
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
        <PanelContainer>
          <Switch>
            <Route path="/admin/dashboard" component={PanelDashboard} />
            <Route path="/admin/url" component={PanelUrl} />
            <Route path="/admin/settings" component={PanelSettings} />
          </Switch>
        </PanelContainer>
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
  background-color: #f4f5f5;
`

const PanelContainer = styled.div`
  margin: 12px;
  background-color: #fff;
  flex: 1;
  padding: 12px;
`
