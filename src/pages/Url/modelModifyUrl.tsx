import moment from 'moment'
import { Modal, DatePicker, Radio } from 'antd'
import { useState, useEffect } from 'react'
import { fetchData } from '../../utils/fetchData'
import { apiUrlUpdate } from '../../utils/api'
import { Modals } from '../../utils/interfaces'

export default function ModifyUrl(props: Modals) {
  const { isModalVisible, setIsModalVisible, onFinish, CurrentUrl } = props
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<any>([])
  const [isPermemt, setIsPerment] = useState(true)

  const { RangePicker } = DatePicker
  const { url_id, permemt, starttime, endtime } = CurrentUrl

  useEffect(() => {
    console.log('读取URL状态：', permemt, starttime, endtime)
    setIsPerment(permemt)
    setDate([moment(starttime), moment(endtime)])
  }, [permemt, starttime, endtime, url_id])

  const handleOk = async () => {
    setLoading(true)

    await fetchData(
      `${apiUrlUpdate}?urlId=${url_id}&method=date`,
      'POST',
      {
        token: localStorage.getItem('sessionToken'),
      },
      {
        permemt: isPermemt,
        starttime: Number(moment(date[0]).format('X')),
        endtime: Number(moment(date[1]).format('X')),
      }
    )

    setLoading(false)
    setIsModalVisible(!isModalVisible)
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
