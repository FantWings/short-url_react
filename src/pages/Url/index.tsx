import moment from 'moment'
import { PageHeader, Table, Space, Button, Popconfirm, Switch } from 'antd'
import { useState, useEffect } from 'react'
import { fetchData } from '../../utils/fetchData'
import { apiUrl } from '../../utils/api'
import { UrlList } from '../../utils/interfaces'
import ModifyUrl from './modelModifyUrl'
import AddUrl from './modelAddUrl'

export default function PanelUrl() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isModifyModalVisible, setIsModifyModalVisible] = useState(false)
  const [urlId, setUrlId] = useState(0)
  const { Column } = Table

  useEffect(() => {
    getUrlList()
  }, [])

  const getUrlList = async () => {
    setData(
      await fetchData(
        `${apiUrl}/getLists`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            token: localStorage.getItem('sessionToken'),
          },
        },
        setLoading
      )
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
      setLoading
    )
    getUrlList()
  }

  const switchStatus = async (enable: boolean, id?: number) => {
    await fetchData(`${apiUrl}/update?urlId=${id}&enable=${enable}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        token: localStorage.getItem('sessionToken'),
      },
    })
    getUrlList()
  }

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="URL管理"
        extra={[
          <Button
            key="addUrl"
            type="primary"
            onClick={() => {
              setIsAddModalVisible(!isAddModalVisible)
            }}
          >
            添加
          </Button>,
        ]}
      />
      <Table dataSource={data} loading={loading} rowKey={'url_id'}>
        <Column
          title="状态"
          dataIndex="status"
          key="status"
          render={(status, record: UrlList) => (
            <Switch
              checkedChildren="开启"
              unCheckedChildren={status === 5 ? '已过期' : '关闭'}
              defaultChecked={status === 5 ? false : status === 0 ? true : false}
              onChange={(enable) => switchStatus(enable, record.url_id)}
              disabled={status === 5}
            />
          )}
        />
        <Column title="原URL" dataIndex="original_url" key="original_url" />
        <Column title="短URL" dataIndex="short_url" key="short_url" />
        <Column
          title="生效时间"
          dataIndex="starttime"
          key="starttime"
          render={(time) => (time === 946670400000 ? '立即生效' : moment(time).format('YYYY-MM-DD HH:mm:ss'))}
        />
        <Column
          title="有效期至"
          dataIndex="endtime"
          key="endtime"
          render={(time) => (time === 253370750400000 ? '长期有效' : moment(time).format('YYYY-MM-DD HH:mm:ss'))}
        />
        <Column
          title="操作"
          dataIndex="action"
          key="action"
          render={(text, record: UrlList) => (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => {
                  setUrlId(record.url_id)
                  setIsModifyModalVisible(true)
                }}
              >
                修改
              </Button>
              <Popconfirm
                placement="top"
                title="删除确认"
                onConfirm={() => actionDelete(record.url_id)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="default" danger>
                  删除
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <AddUrl onFinish={getUrlList} isModalVisible={isAddModalVisible} setIsModalVisible={setIsAddModalVisible} />
      <ModifyUrl
        onFinish={getUrlList}
        isModalVisible={isModifyModalVisible}
        setIsModalVisible={setIsModifyModalVisible}
        urlId={urlId}
      />
    </div>
  )
}
