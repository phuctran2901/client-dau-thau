import { Descriptions, Modal, Spin, Tag } from 'antd'
import { useEffect, useState } from 'react'
import callAPI from '../../callAPI/callAPI'

export const ModalDetail = ({ visible, setVisible, url }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getDetail = () => {
    setLoading(true)
    callAPI
      .post('/getDetail', {
        url: url
      })
      .then((res) => {
        setLoading(false)
        setData(res.data)
      })
  }
  useEffect(() => {
    visible && getDetail()
    return () => {
      setData([])
    }
  }, [visible])
  return (
    <Modal
      open={visible}
      onCancel={() => {
        setVisible(false)
      }}
      width={1000}
    >
      <Spin spinning={loading}>
        <div style={{ textAlign: 'center' }}>
          <h2>{data?.detail?.titlePackage}</h2>
          <Tag style={{ fontSize: 16 }}>
            {data?.detail?.applicationDeadline}
          </Tag>
        </div>
        {!loading && (
          <>
            <h3>Thông tin gói thầu</h3>
            <Descriptions bordered>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Công bố</span>}
                span={2}
              >
                {data?.detail?.publicTime}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Lĩnh vực</span>}
                span={2}
              >
                {data?.detail?.areasOfExpertise}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Trạng thái</span>}
                span={3}
              >
                {data?.detail?.statusPakage}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Tên dự án</span>}
                span={3}
              >
                {data?.detail?.projectName}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Bên mời thầu</span>}
                span={3}
              >
                {data?.detail?.bidSolicitor}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Chủ đầu tư</span>}
                span={3}
              >
                {data?.detail?.investor}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Nguồn vốn</span>}
                span={3}
              >
                {data?.detail?.capital}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Phạm vi</span>}
                span={3}
              >
                {data?.detail?.limit}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Phương thức</span>}
                span={3}
              >
                {data?.detail?.method}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>Loại hợp đồng</span>
                }
                span={3}
              >
                {data?.detail?.typeOfContract}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>Thực hiện tại</span>
                }
                span={3}
              >
                {data?.detail?.doneAt}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    Số quyết định phê duyệt
                  </span>
                }
                span={3}
              >
                {data?.detail?.effectiveTime}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    Cơ quan ban hành phê duyệt
                  </span>
                }
                span={3}
              >
                {data?.detail?.approvalDecisionNumber}
              </Descriptions.Item>
            </Descriptions>
            <h3>Tham dự thầu</h3>
            <Descriptions bordered>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Hình thức</span>}
                span={3}
              >
                {data?.tdt?.formality}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>Chi phí nộp E-HDDT</span>
                }
                span={3}
              >
                {data?.tdt?.expense}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Nhận HSDT từ</span>}
                span={2}
              >
                {data?.tdt?.receivedDate?.from}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>đến</span>}
                span={2}
              >
                {data?.tdt?.receivedDate?.to}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Spin>
    </Modal>
  )
}
