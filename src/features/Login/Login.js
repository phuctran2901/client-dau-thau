import './Login.css'
import { auth, db } from '../../fire/fire'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { Button, Checkbox, Form, Input, message, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ContextAuth } from '../../context/AuthContext'
import { addDoc, collection, getDocs } from 'firebase/firestore'
export const Login = () => {
  const [isAuth, setIsAuth] = useContext(ContextAuth)
  const [form] = Form.useForm()
  const [loadingLogin, setLoadingLogin] = useState(false)
  const navigate = useNavigate()
  const [typeForm, setTypeForm] = useState('login')

  const checkExists = (arr, user) => {
    let isExists = false
    let result = {}
    console.log(user)
    arr.forEach((doc) => {
      if (doc.data().email === user) {
        isExists = true
        result = {
          ...doc.data(),
          id: doc.id
        }
      }
    })
    return { isExists, result }
  }

  const onFinish = (values) => {
    const { email, password } = values
    setLoadingLogin(true)
    if (typeForm === 'login') {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (data) => {
          const usersCollection = collection(db, 'users')
          const users = await getDocs(usersCollection)
          const { isExists, result } = checkExists(users, values.email)
          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              isAuth: true,
              user: result
            })
          )
          setIsAuth({
            isAuth: true,
            user: result
          })
          setLoadingLogin(false)

          notification.success({
            description: 'Đăng nhập thành công',
            message: 'Thành công!'
          })
          navigate('/')
        })
        .catch((err) => {
          setLoadingLogin(false)
          notification.error({
            message: 'Thất bại',
            description: err.message
          })
          console.log(err.message)
        })
    } else {
      createUserWithEmailAndPassword(auth, values.email, values.password).then(
        (resCreate) => {
          addDoc(collection(db, 'users'), {
            ...values,
            role: 'normal'
          }).then(async (res) => {
            notification.success({
              message: 'Thành công',
              description: 'Đăng ký thành công'
            })
            setTypeForm('login')
            form.resetFields()
            setLoadingLogin(false)
          })
        }
      )
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className='login-page'>
      <div className='login-box'>
        <div className='illustration-wrapper'>
          <img
            src='https://png.pngtree.com/element_origin_min_pic/16/08/13/1357aeb44004878.jpg'
            alt='Login'
          />
        </div>
        <Form
          name='login-form'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout={'vertical'}
          form={form}
        >
          <p className='form-title'>Welcome back</p>
          <p style={{ fontSize: 18 }}>Phần mềm truy xuất thông tin đấu thầu</p>
          {typeForm === 'login' ? (
            <>
              <Form.Item
                name='email'
                type='email'
                rules={[
                  { required: true, message: 'Please input your email!' }
                ]}
              >
                <Input placeholder='email' size='large' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' }
                ]}
              >
                <Input.Password placeholder='Password' size='large' />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item required label='Email' name='email'>
                <Input name='Email' placeholder='Email...' size='large' />
              </Form.Item>
              <Form.Item required label='Password' name='password'>
                <Input size='large' type='password' placeholder='Password...' />
              </Form.Item>
              <Form.Item required label='Full Name' name='fullName'>
                <Input
                  name='fullName'
                  placeholder='Full name...'
                  size='large'
                />
              </Form.Item>
              <Form.Item required label='Phone' name='phoneNumber'>
                <Input size='large' placeholder='Phone number...' />
              </Form.Item>
            </>
          )}
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}
          >
            {typeForm === 'login' ? (
              <>
                {' '}
                <span style={{ marginRight: 10 }}>Bạn chưa có tài khoản?</span>
                <span
                  onClick={() => setTypeForm('Register')}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  Đăng ký
                </span>
              </>
            ) : (
              <>
                {' '}
                <span style={{ marginRight: 10 }}>Bạn đã có tài khoản?</span>
                <span
                  onClick={() => setTypeForm('login')}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  Đăng nhập
                </span>
              </>
            )}
          </div>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              loading={loadingLogin}
            >
              {typeForm === 'login' ? 'Đăng nhập' : 'Đăng ký'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
  // return (
  // <div className='wrapper-login'>
  //   <div className='background-login'>
  //     <img
  //       className='background-login-img'
  //       title='login bg'
  //       src={bgLogin}
  //       alt='login bg'
  //     />
  //   </div>
  //   <div className='login-form'>
  //     <Form>
  //       <Form.Item>
  //         <Input />
  //       </Form.Item>
  //     </Form>
  //   </div>
  // </div>

  // )
}

export default Login
