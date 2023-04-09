import { Descriptions, Modal, Spin, Tag } from 'antd'
import { useEffect, useState } from 'react'
import callAPI from '../../callAPI/callAPI'

export const ModalBidSolicitor = ({ visible, setVisible, url }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getDetail = () => {
    setLoading(true)
    callAPI
      .post('/getProcuringEntity', {
        url: url
      })
      .then((res) => {
        console.log(res)
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
  console.log(data)
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
          <h2>{data?.agencyCode}</h2>
        </div>
        {!loading && (
          <>
            <Descriptions bordered>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>Tên cơ quan đầy đủ</span>
                }
                span={3}
              >
                {data?.agencyCode}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    Phân loại trực thuộc
                  </span>
                }
                span={3}
              >
                {data?.subclasses}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>Loại hình cơ quan</span>
                }
                span={3}
              >
                {data?.typeOfAgency || 'Chưa cập nhật...'}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Tỉnh/TP</span>}
                span={3}
              >
                {data?.province}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span style={{ fontWeight: 'bold' }}>Địa chỉ</span>}
                span={3}
              >
                {data?.address}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>Số điện thoại</span>
                }
                span={3}
              >
                {data?.phone}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>Người đại diện</span>
                }
                span={3}
              >
                {data?.representative}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Spin>
    </Modal>
  )
}
