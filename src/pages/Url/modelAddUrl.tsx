import { Modal, Input, Select, message } from 'antd'
import { useState } from 'react'
import { fetchData } from '../../utils/fetchData'
import { apiUrlAdd } from '../../utils/api'
import { Modals } from '../../utils/interfaces'

// 添加链接函数
export default function AddUrl(props: Modals) {
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

  const handleAddUrl = async () => {
    if (newUrl.url.length === 0) return message.error('地址不能为空')
    if (newUrl.url.match(':')) return message.error('地址格式不正确，请勿重复添加 http:// 或 https:// 前缀')
    setLoading(true)

    await fetchData(
      `${apiUrlAdd}`,
      'POST',
      {
        token: localStorage.getItem('sessionToken'),
      },
      {
        url: newUrl.prefix + newUrl.url,
      }
    )

    setLoading(false)
    setIsModalVisible(!isModalVisible)
  }

  return (
    <Modal
      title="添加地址"
      visible={isModalVisible}
      onOk={() => {
        handleAddUrl()
      }}
      onCancel={() => {
        setIsModalVisible(!isModalVisible)
      }}
      confirmLoading={loading}
      afterClose={() => onFinish()}
    >
      <div style={{ marginBottom: 16 }}>
        <Input
          addonBefore={urlSelectBefore}
          onChange={(e) => setNewUrl({ ...newUrl, url: e.target.value })}
          value={newUrl.url}
          onPressEnter={() => handleAddUrl()}
        />
      </div>
    </Modal>
  )
}
