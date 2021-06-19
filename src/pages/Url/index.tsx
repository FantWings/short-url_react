import moment from 'moment'
import { PageHeader, Table, Space, Button, Popconfirm, Switch } from 'antd'
import { useState, useEffect } from 'react'
import { fetchData } from '../../utils/fetchData'
import { apiUrlDelete, apiUrlUpdate, apiUrlGet } from '../../utils/api'
import { UrlList } from '../../utils/interfaces'
import ModifyUrl from './modelModifyUrl'
import AddUrl from './modelAddUrl'

export default function PanelUrl() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isModifyModalVisible, setIsModifyModalVisible] = useState(false)
  const [CurrentUrl, setCurrentUrl] = useState({
    url_id: 0,
  })
  const { Column } = Table

  const getUrlList = async () => {
    setLoading(true)
    setData(
      await fetchData(`${apiUrlGet}`, 'GET', {
        token: localStorage.getItem('sessionToken'),
      })
    )
    setLoading(false)
  }

  useEffect(() => {
    const f = async () => {
      setLoading(true)
      await getUrlList()
      setLoading(false)
    }
    f()
  }, [])

  const actionDelete = async (id: number) => {
    setLoading(true)
    await fetchData(`${apiUrlDelete}?urlId=${id}`, 'DELETE', { token: localStorage.getItem('sessionToken') })
    getUrlList()
    setLoading(false)
  }

  const switchStatus = async (enable: boolean, id?: number) => {
    setLoading(true)
    await fetchData(`${apiUrlUpdate}?urlId=${id}&enable=${enable}`, 'POST', {
      token: localStorage.getItem('sessionToken'),
    })
    getUrlList()
    setLoading(false)
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
              unCheckedChildren={status === 5 ? '无法操作' : '关闭'}
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
                  setIsModifyModalVisible(true)
                  setCurrentUrl(record)
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
        CurrentUrl={CurrentUrl}
      />
    </div>
  )
}
