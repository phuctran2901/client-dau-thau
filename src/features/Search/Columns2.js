import { Button, Tag } from 'antd'

function allColums2(setUrl, setVisible, setUrlBidSolicitor) {
  const columnsProject = [
    {
      title: 'Tên dự án',
      dataIndex: 'package',
      key: 'package',
      render: (data) => {
        return (
          <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            {data.title.text}
          </div>
        )
      }
    },
    {
      title: 'Đơn vị công bố DMDA',
      dataIndex: 'DMDA',
      key: 'DMDA'
    },
    {
      title: 'Ngày đăng tải',
      dataIndex: 'publicTime',
      key: 'publicTime',
      width: 150,
      render: (text) => <Tag color={'blue'}>{text}</Tag>
    }
  ]
  const columnsDetail = [
    {
      title: 'Gói thầu',
      dataIndex: 'package',
      key: 'package',
      render: (data) => {
        return data.title.text
      }
    },
    {
      title: 'Bên mời thầu',
      dataIndex: 'bidSolicitor',
      key: 'bidSolicitor',
      render: (data) => {
        return data.title
      }
    },
    {
      title: 'Thời gian công bố',
      dataIndex: 'publicTime',
      key: 'publicTime',
      width: 150,
      render: (text) => <Tag color={'blue'}>{text}</Tag>
    },
    {
      title: 'Đóng thầu',
      dataIndex: 'expired',
      key: 'expired',
      width: 150,
      render: (text) => <Tag color={'green'}>{text}</Tag>
    }
  ]

  const columnsPrequalification = [
    {
      title: 'Thông báo mời đấu thầu',
      dataIndex: '#',
      key: '#'
    }
  ]
  const columnsPlan = [
    {
      title: 'Tên dự án',
      dataIndex: 'package',
      key: 'package',
      render: (data) => {
        return data.title.text
      }
    },
    {
      title: 'Bên mời thầu',
      dataIndex: 'bidSolicitor',
      key: 'bidSolicitor',
      render: (data) => {
        return data.title
      }
    },
    {
      title: 'Công bố',
      dataIndex: 'publicTime',
      key: 'publicTime',
      width: 150,
      render: (text) => <Tag color={'blue'}>{text}</Tag>
    },
    {
      title: 'Loại dự án',
      dataIndex: 'typeProject',
      key: 'typeProject',
      width: 150
    }
  ]

  const columnsResult = [
    {
      title: 'Gói thầu',
      dataIndex: 'nameProject',
      key: 'nameProject'
    },
    {
      title: 'Bên mời thầu',
      dataIndex: 'bidSolicitor',
      key: 'bidSolicitor',
      render: (data) => {
        return data.title
      }
    },
    {
      title: 'Hoàn thành',
      dataIndex: 'publicTime',
      key: 'publicTime',
      width: 150,
      render: (text) => <Tag color={'blue'}>{text}</Tag>
    },
    {
      title: 'Trúng thầu',
      dataIndex: 'wonBid',
      key: 'wonBid',
      width: 300
      // render: (text) => <Tag color={'green'}>{text}</Tag>
    }
  ]

  const columnsListresultpq = [
    {
      title: 'Tên dự án',
      dataIndex: 'package',
      key: 'package',
      render: (data) => {
        return data.title.text
      }
    },
    {
      title: 'Bên mời thầu',
      dataIndex: 'bidSolicitor',
      key: 'bidSolicitor',
      render: (data) => {
        return data.title
      }
    },
    {
      title: 'Mở thầu',
      dataIndex: 'publicTime',
      key: 'publicTime',
      width: 150,
      render: (text) => <Tag color={'blue'}>{text}</Tag>
    },
    {
      title: 'Nhà thầu được chọn',
      dataIndex: 'listResult',
      key: 'listResult',
      width: 400,
      render: (list) => {
        return (
          <ol>
            {list.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ol>
        )
      }
    }
  ]

  const allColums2 = [
    columnsProject,
    columnsDetail,
    columnsPrequalification,
    columnsPlan,
    columnsResult,
    columnsListresultpq
  ]
  return allColums2
}
export default allColums2
