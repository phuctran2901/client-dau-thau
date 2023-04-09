import { Button, Tag } from 'antd'
export function allColumns(
  setUrl,
  setVisible,
  setUrlBidSolicitor,
  setVisible2
) {
  const columnsDetail = [
    {
      title: 'Gói thầu',
      dataIndex: 'package',
      key: 'package',
      render: (data) => {
        return (
          <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            <Button
              style={{ whiteSpace: 'unset', textAlign: 'left' }}
              type='link'
              onClick={() => {
                setUrl(data.title.link)
                setVisible(true)
              }}
            >
              {data.title.text}
            </Button>
          </div>
        )
      }
    },
    {
      title: 'Bên mời thầu',
      dataIndex: 'bidSolicitor',
      key: 'bidSolicitor',
      render: (data) => {
        return (
          <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            <Button
              style={{ whiteSpace: 'unset', textAlign: 'left' }}
              type='link'
              onClick={() => {
                setUrlBidSolicitor(data.link)
                setVisible2(true)
              }}
            >
              {data.title}
            </Button>
          </div>
        )
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
      title: 'Hết hạn',
      dataIndex: 'expired',
      key: 'expired',
      width: 150,
      render: (text) => <Tag color={'green'}>{text}</Tag>
    }
  ]
  const columnsDevProjects = [
    {
      title: 'Tên dự án',
      dataIndex: 'package',
      key: 'package',
      render: (data) => {
        return data.title.text
      }
    },
    {
      title: 'Chủ đầu tư',
      dataIndex: 'bidSolicitor',
      key: 'bidSolicitor',
      render: (data) => {
        return data.title
      }
    },
    {
      title: 'Ngày đăng tải',
      dataIndex: 'publicTime',
      key: 'publicTime',
      width: 150,
      render: (text) => <Tag color={'blue'}>{text}</Tag>
    },
    {
      title: 'KHLCNT',
      dataIndex: 'KHLCNT',
      key: 'KHLCNT',
      width: 150,
      render: (text) => <Tag color={'green'}>{text}</Tag>
    }
  ]
  const columnsPlan = [
    {
      title: 'Gói thầu',
      dataIndex: 'package',
      key: 'package',
      render: (data) => {
        return (
          <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            <Button
              style={{ whiteSpace: 'unset', textAlign: 'left' }}
              type='link'
              onClick={() => {
                setUrl(data.title.link)
                setVisible(true)
              }}
            >
              {data.title.text}
            </Button>
          </div>
        )
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
      title: 'Gói thầu',
      dataIndex: 'packageAmount',
      key: 'packageAmount',
      width: 150,
      render: (text) => <Tag color={'green'}>{text}</Tag>
    }
  ]

  const columnsResult = [
    {
      title: 'Gói thầu',
      dataIndex: 'package',
      key: 'package',
      render: (data) => {
        return (
          <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            <Button
              style={{ whiteSpace: 'unset', textAlign: 'left' }}
              type='link'
              onClick={() => {
                setUrl(data.title.link)
                setVisible(true)
              }}
            >
              {data.title.text}
            </Button>
          </div>
        )
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

  const columnsPrequalification = [
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
    }
  ]

  const columnsOpen = [
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
      title: 'Mở thầu',
      dataIndex: 'publicTime',
      key: 'publicTime',
      width: 150,
      render: (text) => <Tag color={'blue'}>{text}</Tag>
    },
    {
      title: 'Kết quả',
      dataIndex: 'results',
      key: 'results',
      width: 300,
      render: (text) => {
        return <div dangerouslySetInnerHTML={{ __html: text }} />
      }
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
  return [
    columnsDetail,
    columnsPlan,
    columnsResult,
    columnsPrequalification,
    columnsOpen,
    columnsListresultpq,
    columnsDevProjects
  ]
}
