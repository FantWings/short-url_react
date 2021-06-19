import { PageHeader, Button, Avatar } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { UserAPI } from '../../utils/api'
import { UserInfo } from '../../utils/interfaces'
import { UserOutlined } from '@ant-design/icons'
import { Typography } from 'antd'

export default function PanelSettings() {
  const { Paragraph } = Typography
  const { updateUserInfo } = UserAPI()
  const [userInfo, setUserInfo] = useState<UserInfo>({
    uuid: '',
    email: 'loading',
    avatar: '',
    username: '',
    active: false,
    nick_name: '',
  })

  useEffect(() => {
    const { getUserInfo } = UserAPI()
    getUserInfo().then((data) =>
      setUserInfo((prev) => {
        return { prev, ...data }
      })
    )
  }, [])

  async function handleUpdateUserInfo(action: string, e: string) {
    await updateUserInfo(action, e).then(() => {
      setUserInfo({ ...userInfo, nick_name: e })
    })
  }

  return (
    <div>
      <PageHeader className="site-page-header" title="设置" />
      <ItemContent>
        <div className="itemKey">
          <span className="title">头像</span>
          <span className="description">更改您的头像</span>
        </div>
        <div className="itemValue">
          <Avatar
            size={64}
            src={userInfo.avatar || undefined}
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
          />
        </div>
      </ItemContent>
      <ItemContent>
        <div className="itemKey">
          <span className="title">修改密码</span>
          <span className="description">修改密码点击此处</span>
        </div>
        <div className="itemValue">
          <Button type="primary">修改</Button>
        </div>
      </ItemContent>
      <ItemContent>
        <div className="itemKey">
          <span className="title">昵称</span>
          <span className="description">更改您的昵称</span>
        </div>
        <div className="itemValue">
          <Paragraph
            editable={{
              tooltip: '点击修改',
              onChange: (e) => {
                handleUpdateUserInfo('nickname', e)
              },
            }}
            style={{ margin: '0' }}
          >
            {userInfo.nick_name || '未设置'}
          </Paragraph>
        </div>
      </ItemContent>
      <ItemContent>
        <div className="itemKey">
          <span className="title">邮箱</span>
          <span className="description">邮箱为您的初始注册邮箱，暂不支持修改</span>
        </div>
        <div className="itemValue">
          <span>zhijun@furry.top</span>
        </div>
      </ItemContent>
      <ItemContent>
        <div className="itemKey">
          <span className="title">手机号码</span>
          <span className="description">手机号码</span>
        </div>
        <div className="itemValue">
          <Paragraph
            editable={{
              tooltip: '点击修改',
              onChange: (e) => {
                handleUpdateUserInfo('mobile', e)
              },
            }}
            style={{ margin: '0' }}
          >
            {userInfo.phone || '未绑定'}
          </Paragraph>
        </div>
      </ItemContent>
    </div>
  )
}

const ItemContent = styled.div`
  border-top: 1px #f0f0f0 solid;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :last-child {
    border-bottom: 1px #f0f0f0 solid;
  }

  div.itemKey {
    .title {
      color: #333;
      display: block;
      font-size: 14px;
      font-weight: 550;
    }
    .description {
      display: block;
      font-size: 12px;
      color: #adadad;
    }
  }

  div.itemValue {
    display: flex;
    align-items: center;
  }
`
