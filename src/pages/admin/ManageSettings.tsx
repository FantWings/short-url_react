import { PageHeader, Button, Avatar } from 'antd'
import styled from 'styled-components'

export default function PanelSettings() {
  return (
    <div>
      <PageHeader className="site-page-header" title="设置" />
      <ItemContent>
        <div className="itemKey">
          <span className="title">头像</span>
          <span className="description">更改您的头像</span>
        </div>
        <div className="itemValue">
          <Avatar size={64} />
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
          <span className="title">修改密码</span>
          <span className="description">修改密码点击此处</span>
        </div>
        <div className="itemValue">
          <Button type="primary">修改</Button>
        </div>
      </ItemContent>
      <ItemContent>
        <div className="itemKey">
          <span className="title">手机号码</span>
          <span className="description">手机号码</span>
        </div>
        <div className="itemValue">
          <Button type="primary">修改</Button>
        </div>
      </ItemContent>
      <ItemContent>
        <div className="itemKey">
          <span className="title">用户名</span>
          <span className="description">用户名为您的初始注册邮箱，暂不支持修改</span>
        </div>
        <div className="itemValue">
          <span>zhijun@furry.top</span>
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