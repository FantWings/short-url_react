import moment from 'moment'
import {
  PageHeader,
  Table,
  Space,
  Button,
  Popconfirm,
  Switch,
  Modal,
  Input,
  Select,
  message,
  DatePicker,
  Radio,
} from 'antd'
import { useState, useEffect } from 'react'
import { fetchData } from '../../utils/fetchData'
import { apiUrl } from '../../utils/api'
import { UrlList, Modals } from '../../utils/interfaces'

export default function PanelUrl() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModifyModalVisible, setIsModifyModalVisible] = useState(false)
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

  const switchStatus = async (enable: boolean, id?: number) => {
    await fetchData(
      `${apiUrl}/update?urlId=${id}&enable=${enable}`,
      {
        method: 'POST',
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
              setIsModalVisible(!isModalVisible)
            }}
          >
            添加
          </Button>,
        ]}
      />
      <Table dataSource={data} loading={loading} rowKey={'url_id'}>
        <Column
          title="状态"
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
          title="有效期至"
          dataIndex="vaild_time"
          key="vaild_time"
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
      <AddUrl onFinish={getUrlList} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      <ModifyUrl
        onFinish={getUrlList}
        isModalVisible={isModifyModalVisible}
        setIsModalVisible={setIsModifyModalVisible}
      />
    </div>
  )
}

// 添加链接函数
function AddUrl(props: Modals) {
  const [newUrl, setNewUrl] = useState({ prefix: 'https://', url: '' })
  const [loading, setLoading] = useState(false)

  const { isModalVisible, setIsModalVisible, onFinish } = props

  const { Option } = Select
  const urlSelectBefore = (
    <Select
      defaultValue={newUrl.prefix}
      className="select-before"
      onChange={(prefix) => setNewUrl({ ...newUrl, prefix })}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  )

  const handleAddUrl = async (newurl: { prefix: string; url: string }) => {
    if (newurl.url.length === 0) return message.error('地址不能为空')
    if (newurl.url.match(':')) return message.error('地址格式不正确，请勿重复添加 http:// 或 https:// 前缀')

    await fetchData(
      `${apiUrl}/add`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          token: localStorage.getItem('sessionToken'),
        },
        body: JSON.stringify({
          url: newurl.prefix + newurl.url,
        }),
      },
      setLoading,
      undefined
    )

    setIsModalVisible(!isModalVisible)
    setNewUrl({ ...newurl, url: '' })
    onFinish()
  }

  return (
    <Modal
      title="添加地址"
      visible={isModalVisible}
      onOk={() => {
        handleAddUrl(newUrl)
      }}
      onCancel={() => {
        setIsModalVisible(!isModalVisible)
      }}
      confirmLoading={loading}
    >
      <div style={{ marginBottom: 16 }}>
        <Input
          addonBefore={urlSelectBefore}
          onChange={(e) => setNewUrl({ ...newUrl, url: e.target.value })}
          value={newUrl.url}
          onPressEnter={() => handleAddUrl(newUrl)}
        />
      </div>
    </Modal>
  )
}

function ModifyUrl(props: Modals) {
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<any>([])
  const [isPermemt, setIsPerment] = useState(true)

  const { isModalVisible, setIsModalVisible, onFinish } = props
  const { RangePicker } = DatePicker

  function handleOk() {
    setLoading(true)
    if (!isPermemt) {
      if (date.length === 0) {
        message.warn('请选择日期')
        return setLoading(false)
      }
    }

    // await fetchData(
    //   `${apiUrl}/update?urlId=${id}&method=date`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json',
    //       token: localStorage.getItem('sessionToken'),
    //     },
    //     body: JSON.stringify({
    //       url: newurl.prefix + newurl.url,
    //     }),
    //   },
    //   setLoading,
    //   undefined
    // )

    setLoading(false)
    setIsModalVisible(!isModalVisible)
    setDate([])
    setIsPerment(true)
    onFinish()
  }

  return (
    <Modal
      title="修改内容"
      visible={isModalVisible}
      onOk={() => {
        handleOk()
      }}
      onCancel={() => {
        setIsModalVisible(!isModalVisible)
      }}
      confirmLoading={loading}
    >
      <div style={{ marginBottom: 16 }}>
        <Radio.Group
          onChange={(e) => {
            setIsPerment(e.target.value)
          }}
          defaultValue={isPermemt}
          buttonStyle="solid"
          style={{ marginBottom: '24px' }}
          value={isPermemt}
        >
          <Radio.Button value={true}>长期有效</Radio.Button>
          <Radio.Button value={false}>时间限定</Radio.Button>
        </Radio.Group>
        <span style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>有效期设置</span>
        <RangePicker
          showTime
          onChange={(e) => setDate(e)}
          allowEmpty={[true, false]}
          value={date}
          disabled={isPermemt}
        />
      </div>
    </Modal>
  )
}
