import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Table,
  Tag
} from 'antd'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import callAPI from '../../callAPI/callAPI'
import { serialize } from '../../untils/serialize'
import { allColumns } from './Columns'
import moment from 'moment'
import {
  dataTypeSearch,
  dataTypeSearch2,
  dataTypeSearch3,
  typeSearch2
} from './Select'
import allColums2 from './Columns2'
import allColums3 from './Columns3'
import { ModalDetail } from './Modal'
import { ModalBidSolicitor } from './Modal2'
import { useLocation, useNavigate } from 'react-router-dom'
import { ContextAuth } from '../../context/AuthContext'
import { RiFileExcel2Fill } from 'react-icons/ri'
import tableExport from 'antd-table-export'
import { Excel } from 'antd-table-saveas-excel'
const { Option } = Select
export const Search = () => {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [data, setData] = useState([])
  const [loadingData, setLoadingData] = useState(false)
  const [totalPage, setTotalPage] = useState()
  const [typeInfo, setTypeInfo] = useState(1)
  const [page, setPage] = useState(1)
  const [typeSearch, setTypeSearch] = useState(1)
  const [url, setUrl] = useState('')
  const [submitTypeSearch, setSubmitTypeSearch] = useState(1)
  const [key, setKey] = useState('')
  const [urlBidSolicitor, setUrlBidSolicitor] = useState('')

  const getData = (page = 1, key) => {
    setLoadingData(true)
    callAPI.get(`/getData?page=${page}${key ? '&' + key : ''}`).then((res) => {
      setData(res.data.data)
      setTotalPage(res.data.totalPage)
      setLoadingData(false)
    })
  }
  useEffect(() => {
    getData(page, key)
  }, [page])

  const handleOnChangePagination = (page, pageSize) => {
    setPage(page)
  }
  const onFinish = (values) => {
    if (Object.values(values).some((value) => value !== undefined)) {
      // check values not undefined
      const filter = {
        ...values,
        sfrom: values.date ? values.date[0].format('DD/MM/YYYY') : undefined,
        sto: values.date ? values.date[1].format('DD/MM/YYYY') : undefined
      }

      delete filter.date
      getData(page, serialize(values.date ? filter : values))
      setSubmitTypeSearch(values.type_search || 1)
      setKey(serialize(values.date ? filter : values))
      setTypeInfo(values[`type_info${typeSearch > 1 ? typeSearch : ''}`] || 1)
    }
    console.log(serialize(values))
  }
  const handleOnChangeTypeSearch = (e) => {
    setTypeSearch(e.target.value)
  }
  const handleDownloadExcel = () => {
    const formatData = data.map((item) => ({
      ...item,
      package: item.package.title.text || item.package.title.textResult,
      link: `https://dauthau.asia/${item.package.title.link}`,
      bidSolicitor: item.bidSolicitor.title
    }))
    console.log(formatData)
    const exportInstance = new tableExport(
      formatData,
      submitTypeSearch === 1
        ? [
            ...allColumns(setUrl, setVisible, setUrlBidSolicitor, setVisible2)[
              typeInfo - 1
            ],
            {
              title: 'Link',
              dataIndex: 'link'
            }
          ]
        : submitTypeSearch === 2
        ? allColums2(setUrl, setVisible, setUrlBidSolicitor, setVisible2)[
            typeInfo - 1
          ]
        : allColums3()[typeInfo - 1]
    )
    exportInstance.download(
      `${moment(new Date()).format('HHmmss-DDMMYYYY')}`,
      'xlsx'
    )
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#E8F1FF',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          width: '90%',
          marginTop: 50
        }}
      >
        <div style={{ marginBottom: 20, width: '100%' }}>
          <Form layout='vertical' onFinish={onFinish}>
            <div style={{ display: 'flex' }}>
              <Form.Item
                name={'q'}
                label={<span style={{ fontWeight: 'bold' }}>Từ khóa</span>}
                style={{ width: '49%', marginRight: 8 }}
              >
                <Input.Search />
              </Form.Item>
              <Form.Item
                name={'type_search'}
                label={
                  <span style={{ fontWeight: 'bold' }}>Thông tin dành cho</span>
                }
                style={{ width: '49%', marginRight: 8 }}
              >
                <Radio.Group
                  defaultValue={1}
                  onChange={handleOnChangeTypeSearch}
                >
                  <Radio value={1} defaultChecked>
                    Nhà thầu
                  </Radio>
                  <Radio value={2}>Nhà đầu tư</Radio>
                  <Radio value={3}>Đấu giá</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div style={{ display: 'flex' }}>
              <Form.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>Loại thông tin</span>
                }
                name={`type_info${typeSearch > 1 ? typeSearch : ''}`}
                style={{ width: '49%', marginRight: 8 }}
              >
                <Select>
                  {typeSearch === 1 &&
                    dataTypeSearch.map((item) => {
                      return (
                        <Option value={item.value} key={item.value}>
                          {item.title}
                        </Option>
                      )
                    })}
                  {typeSearch === 2 &&
                    dataTypeSearch2.map((item) => {
                      return (
                        <Option value={item.value} key={item.value}>
                          {item.title}
                        </Option>
                      )
                    })}
                  {typeSearch === 3 &&
                    dataTypeSearch3.map((item) => {
                      return (
                        <Option value={item.value} key={item.value}>
                          {item.title}
                        </Option>
                      )
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    Khoảng thời gian công bố
                  </span>
                }
                name='date'
                style={{ width: '49%' }}
              >
                <DatePicker.RangePicker
                  format={'DD/MM/YYYY'}
                  name='date'
                  disabledDate={(date) => {
                    return date.isAfter()
                  }}
                />
              </Form.Item>
            </div>
            <Button type='primary' htmlType='submit' size='large'>
              Gửi
            </Button>
          </Form>
        </div>
        <ModalDetail visible={visible} setVisible={setVisible} url={url} />
        <ModalBidSolicitor
          visible={visible2}
          setVisible={setVisible2}
          url={urlBidSolicitor}
        />
        <div
          style={{
            textAlign: 'right',
            marginBottom: 10
          }}
        >
          <Button
            onClick={handleDownloadExcel}
            size='large'
            icon={<RiFileExcel2Fill />}
          >
            Excel
          </Button>
        </div>
        <Table
          loading={loadingData}
          columns={
            submitTypeSearch === 1
              ? allColumns(setUrl, setVisible, setUrlBidSolicitor, setVisible2)[
                  typeInfo - 1
                ]
              : submitTypeSearch === 2
              ? allColums2(setUrl, setVisible, setUrlBidSolicitor, setVisible2)[
                  typeInfo - 1
                ]
              : allColums3()[typeInfo - 1]
          }
          dataSource={data}
          pagination={{
            total: Number(totalPage) * 20,
            pageSize: 20,
            showSizeChanger: false,
            onChange: handleOnChangePagination
          }}
          scroll={{
            y: 500
          }}
        />
      </div>
    </div>
  )
}

export default Search
