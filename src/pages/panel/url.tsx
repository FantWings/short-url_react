import { PageHeader, Table, Tag, Space } from 'antd'
import { useState, useEffect } from 'react'
import { fetchData } from '../../utils/fetchData'

export default function PanelUrl() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getUrlList = async () => {
      await fetchData(
        `http://127.0.0.1:5000/url/getLists`,
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
    getUrlList()
  }, [])

  const columns = [
    {
      title: '原URL',
      dataIndex: 'original_url',
      key: 'original_url',
    },
    {
      title: '短URL',
      dataIndex: 'short_url',
      key: 'short_url',
    },
    {
      title: '有效时间',
      dataIndex: 'vaild_time',
      key: 'vaild_time',
    },
    {
      title: '操作',
      dataIndex: 'command',
      key: 'command',
    },
  ]

  return (
    <div>
      <PageHeader className="site-page-header" title="URL管理" />
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  )
}
