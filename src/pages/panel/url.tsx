import { PageHeader, Table, Space, Button, Popconfirm, Switch } from 'antd'
import { useState, useEffect } from 'react'
import { fetchData } from '../../utils/fetchData'
import { apiUrl } from '../../utils/api'
import { UrlList } from '../../utils/interfaces'

export default function PanelUrl() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const { Column } = Table

  useEffect(() => {
    getUrlList()
  }, [])

  const getUrlList = async () => {
    await fetchData(
      `${apiUrl}/getLists`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          token: localStorage.getItem('sessionToken'),
        },
      },
      setLoading,
      setData
    )
  }

  const actionDelete = async (id: number) => {
    await fetchData(
      `${apiUrl}/delete?urlId=${id}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          token: localStorage.getItem('sessionToken'),
        },
      },
      setLoading,
      undefined
    )
    getUrlList()
  }

  const switchStatus = async (enable: boolean) => {
    // await fetchData(
    //   `${apiUrl}/delete?urlId=${id}`,
    //   {
    //     method: 'DELETE',
    //     headers: {
    //       'content-type': 'application/json',
    //       token: localStorage.getItem('sessionToken'),
    //     },
    //   },
    //   setLoading,
    //   undefined
    // )
    getUrlList()
  }

  return (
    <div>
      <PageHeader className="site-page-header" title="URL管理" />
      <Table dataSource={data} loading={loading}>
        <Column
          title="状态"
          dataIndex="status"
          key="status"
          render={(status) => (
            <Switch
              checkedChildren="开启"
              unCheckedChildren={status === 5 ? '已过期' : '关闭'}
              defaultChecked={status === 5 ? false : status === 0 ? true : false}
              onChange={(enable) => switchStatus(enable)}
              disabled={status === 5}
            />
          )}
        />
        {/* <Column title="状态" dataIndex="status" key="status" render={(status) => StatusCode(status)} /> */}
        <Column title="原URL" dataIndex="original_url" key="original_url" />
        <Column title="短URL" dataIndex="short_url" key="short_url" />
        <Column
          title="有效时间"
          dataIndex="vaild_time"
          key="vaild_time"
          render={(time) => (time ? time : '永久有效')}
        />
        <Column
          title="操作"
          dataIndex="action"
          key="action"
          render={(text, record: UrlList) => (
            <Space size="middle">
              <Popconfirm
                placement="top"
                title="删除确认"
                onConfirm={() => actionDelete(record.url_id)}
                okText="确定"
                cancelText="取消"
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

const StatusCode = (statusCode: number) => {
  switch (statusCode) {
    case 0:
      return <span style={{ color: '#3fab3f' }}>正常</span>
    case 1:
      return '禁用'
    case 5:
      return '过期'
    case 10:
      return '封禁'
  }
}
