import moment from 'moment'
import { Modal, DatePicker, Radio } from 'antd'
import { useState } from 'react'
import { fetchData } from '../../utils/fetchData'
import { apiUrl } from '../../utils/api'
import { Modals } from '../../utils/interfaces'

export default function ModifyUrl(props: Modals) {
  const { isModalVisible, setIsModalVisible, onFinish, urlId } = props
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<any>([moment(), moment().add(1, 'days')])
  const [isPermemt, setIsPerment] = useState(true)

  const { RangePicker } = DatePicker

  const handleOk = async () => {
    await fetchData(
      `${apiUrl}/update?urlId=${urlId}&method=date`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          token: localStorage.getItem('sessionToken'),
        },
        body: JSON.stringify({
          permemt: isPermemt,
          starttime: Number(moment(date[0]).format('X')),
          endtime: Number(moment(date[1]).format('X')),
        }),
      },
      setLoading
    )
    onFinish()
    setIsModalVisible(!isModalVisible)
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
      destroyOnClose
    >
      <div style={{ marginBottom: 16 }}>
        <Radio.Group
          onChange={(e) => {
            setIsPerment(e.target.value)
          }}
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
