import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css'
import Router from './router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider direction="ltr" locale={zhCN}>
      <Router />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
