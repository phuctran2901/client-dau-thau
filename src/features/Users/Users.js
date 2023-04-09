import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Input, notification, Select, Table } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ContextAuth } from '../../context/AuthContext'
import { auth, db } from '../../fire/fire'
import './Users.style.css'
function makeid(length) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

export const Role = ['admin', 'vip', 'normal']
export const Users = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [loadingForm, setLoadingForm] = useState(false)
  const [selectedKeys, setSelectedKey] = useState([])
  const [api, contextHolder] = notification.useNotification()
  const location = useLocation()
  const navigate = useNavigate()
  const [isAuth] = useContext(ContextAuth)
  const [isUpdate, setIsUpdate] = useState(false)
  const openNotification = (placement, des) => {
    api.info({
      message: `${placement}`,
      description: des
    })
  }
  const columns = [
    {
      title: '#',
      dataIndex: '#',
      key: '#',
      render: (_, __, index) => {
        console.log(index)
        return index + 1
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    }
  ]

  const handleGetUsers = async () => {
    const usersCollection = collection(db, 'users')
    const data = await getDocs(usersCollection)
    const users = data.docs.map((doc) => {
      const user = doc.data()
      const key = doc.id
      return {
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        uid: key
      }
    })
    setData(users)
  }
  useEffect(() => {
    handleGetUsers()
  }, [])

  useEffect(() => {
    if (isUpdate) {
      const userUpdate = data.find((user) => user.uid === selectedKeys[0])
      form.setFieldsValue({
        ...userUpdate
      })
    }
  }, [visibleDrawer])

  useEffect(() => {
    if (location.pathname === '/users' && isAuth?.user?.role !== 'admin') {
      navigate('/')
    }
  }, [location])

  const checkExists = (arr, user) => {
    let isExists = false
    let result = {}
    arr.forEach((doc) => {
      if (doc.data().email === user.email) {
        isExists = true
        result = {
          ...doc.data(),
          id: doc.id
        }
      }
    })
    return { isExists, result }
  }
  const addUser = async (user) => {
    setLoadingForm(true)
    try {
      const usersCollection = collection(db, 'users')
      const data = await getDocs(usersCollection)
      const { isExists, result } = checkExists(data, user)
      if (!isExists) {
        createUserWithEmailAndPassword(auth, user.email, user.password).then(
          (resCreate) => {
            addDoc(collection(db, 'users'), {
              // idSocical: user.id || null,
              // fullName: user.name || user.displayName || user.fullName || null,
              // avatar:
              //   user.photoUrl ||
              //   'https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png',
              // email: user.email,
              // uid: user.uid || null,
              // birthday: user?.birthday || null,
              // phoneNumber: user?.phoneNumber || null,
              // level: 0,
              ...user
            }).then(async (res) => {
              setVisibleDrawer(false)
              setLoadingForm(false)
              handleGetUsers()
              setSelectedKey([])
              form.resetFields()
              openNotification('Thành công!', 'Tạo tài khoản thành công')
            })
          }
        )
      } else {
      }
    } catch (err) {
      setLoadingForm(false)
    }
  }
  const handleEditUser = async (newUser) => {
    setLoadingForm(true)
    await updateDoc(doc(db, 'users', selectedKeys[0]), {
      ...newUser
    }).then((res) => {
      setLoadingForm(true)
      setVisibleDrawer(false)
      setIsUpdate(false)
      openNotification('Thành công!', 'Sửa tài khoản thành công')
      setSelectedKey([])
      handleGetUsers()
    })
  }
  const handleDeleteUser = async () => {
    await deleteDoc(doc(db, 'users', selectedKeys[0])).then((res) => {
      setVisibleDrawer(false)
      openNotification('Thành công!', 'Xóa tài khoản thành công')
      setSelectedKey([])
      handleGetUsers()
    })
  }
  const onFinish = (values) => {
    console.log(values)
    if (isUpdate) {
      handleEditUser(values)
    } else {
      addUser(values)
    }
  }
  return (
    <Content
      style={{ backgroundColor: '#E8F1FF', padding: 20, height: '100vh' }}
    >
      <Drawer
        title={'User'}
        open={visibleDrawer}
        onClose={() => setVisibleDrawer(false)}
        width={500}
      >
        <Form form={form} name='user' onFinish={onFinish} layout='vertical'>
          <Form.Item required label='Email' name='email'>
            <Input name='Email' placeholder='Email...' size='large' />
          </Form.Item>
          {!isUpdate && (
            <Form.Item required label='Password' name='password'>
              <Input size='large' placeholder='password...' />
            </Form.Item>
          )}
          <Form.Item required label='Full Name' name='fullName'>
            <Input name='fullName' placeholder='Full name...' size='large' />
          </Form.Item>
          <Form.Item required label='Type' name='role' initialValue={'normal'}>
            <Select
              size='large'
              options={Role.map((role) => ({
                label: role.toUpperCase(),
                value: role
              }))}
            />
          </Form.Item>
          <Form.Item required label='Phone' name='phoneNumber'>
            <Input size='large' placeholder='Phone number...' />
          </Form.Item>

          <Button
            htmlType='submit'
            type='primary'
            style={{ width: '100%' }}
            size='large'
            loading={loadingForm}
          >
            Submit
          </Button>
        </Form>
      </Drawer>

      <div className='button-wrap'>
        <div
          className='action-button'
          onClick={() => {
            setVisibleDrawer(true)
          }}
        >
          <PlusOutlined style={{ fontSize: 20, color: 'green' }} />
        </div>
        <div
          className='action-button'
          onClick={() => {
            if (selectedKeys.length === 1) {
              setVisibleDrawer(true)
              setIsUpdate(true)
            }
          }}
          style={{
            backgroundColor: selectedKeys.length !== 1 ? 'lightgray' : ''
          }}
        >
          <EditOutlined style={{ fontSize: 20, color: 'blue' }} />
        </div>
        <div
          className='action-button'
          onClick={() => {
            if (selectedKeys.length === 1) {
              handleDeleteUser()
            }
          }}
          style={{
            backgroundColor: selectedKeys.length !== 1 ? 'lightgray' : ''
          }}
        >
          <DeleteOutlined style={{ fontSize: 20, color: 'red' }} />
        </div>
      </div>
      <Table
        selectedKeys={selectedKeys}
        selectedRowKeys={selectedKeys}
        selectedRows={selectedKeys}
        rowKey={(record) => {
          return record.uid
        }}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedKey(selectedRowKeys)
          }
        }}
        columns={columns}
        dataSource={data}
        style={{ marginTop: 20 }}
      />
    </Content>
  )
}

export default Users
