import styled from 'styled-components'
import { useHistory } from 'react-router'
import { useState, useEffect } from 'react'
import { Avatar, Menu, Dropdown, Layout, Breadcrumb } from 'antd'
import { PieChartOutlined, DesktopOutlined, SettingOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons'
import { Route, Switch } from 'react-router-dom'
import useLoginCheck from '../hooks/useLoginCheck'
import { UserInfo } from '../utils/interfaces'
import { UserAPI, AuthAPI } from '../utils/api'

import PanelUrl from './Url'
import PanelDashboard from './Dashboard'
import PanelSettings from './Settings'

export default function AdminPage() {
  useLoginCheck()
  const history = useHistory()
  const { Header, Content, Sider } = Layout
  const { logOut } = AuthAPI()

  const [userInfo, setUserInfo] = useState<UserInfo>({
    uuid: '',
    email: 'loading',
    avatar: '',
    username: '',
    active: false,
  })

  useEffect(() => {
    const { getUserInfo } = UserAPI()
    getUserInfo().then((data) => setUserInfo(data))
  }, [])

  const avatarMenu = (
    <Menu>
      <Menu.Item onClick={logOut}>
        <span>
          <LoginOutlined style={{ color: 'red' }} />
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Header>
        <HeaderContinaer>
          <div>AdminPanel</div>
          <Dropdown overlay={avatarMenu} placement="bottomRight" arrow>
            <div>
              <Avatar size={32} icon={<UserOutlined />} style={{ margin: '0 12px' }} src={userInfo.avatar} />
              <span>{userInfo.nick_name || userInfo.email}</span>
            </div>
          </Dropdown>
        </HeaderContinaer>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="vertical"
            theme="dark"
            style={{ height: 'calc(100vh - 64px)', borderRight: 0 }}
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
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Body>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path="/admin/dashboard">
                  <PanelDashboard />
                </Route>
                <Route path="/admin/url">
                  <PanelUrl />
                </Route>
                <Route path="/admin/settings">
                  <PanelSettings />
                </Route>
              </Switch>
            </Content>
          </Body>
        </Layout>
      </Layout>
    </Layout>
  )
}

const HeaderContinaer = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    color: #fff;
    margin: 0 24px;
  }
`
const Body = styled.div`
  .site-layout-background {
    background-color: #fff;
  }
`
