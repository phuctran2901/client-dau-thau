import { Tag } from 'antd'
function allColums3() {
  const columnsAuction = [
    {
      title: 'Tên tài sản',
      dataIndex: 'nameAsset',
      key: 'nameAsset'
    },
    {
      title: 'Tài sản của',
      dataIndex: 'assetBy',
      key: 'assetBy'
    },
    {
      title: 'Thời gian công khai',
      dataIndex: 'publicTime',
      key: 'publicTime',
      width: 150,
      render: (text) => <Tag color={'blue'}>{text}</Tag>
    },
    {
      title: 'Thời gian tổ chức đấu giá',
      dataIndex: 'expired',
      key: 'expired',
      width: 150,
      render: (text) => <Tag color={'blue'}>{text}</Tag>
    }
  ]

  const allColums3 = [columnsAuction, columnsAuction]
  return allColums3
}
export default allColums3
