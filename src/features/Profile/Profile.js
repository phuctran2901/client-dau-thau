import { Button, Form, Input, Tabs } from 'antd'
import { useContext, useEffect } from 'react'
import { AuthProvider, ContextAuth } from '../../context/AuthContext'
import { useForm } from 'antd/es/form/Form'
import { updateProfile } from 'firebase/auth'
import { auth } from '../../fire/fire'
import { ChangePassword } from './ChangePassword'

export const Profile = () => {
  const [authState] = useContext(ContextAuth)
  const [form] = useForm()
  useEffect(() => {
    form.setFieldsValue({
      fullName: authState.user.fullName,
      phoneNumber: authState.user.phoneNumber
    })
  }, [])

  return (
    <div style={{ marginTop: 50, marginLeft: 50 }}>
      <Tabs tabPosition='left'>
        <Tabs.TabPane key={'1'} tabKey='1' tab={'Profile'}>
          <div style={{ width: 700 }}>
            <Form
              form={form}
              layout='vertical'
              onFinish={(values) => {
                console.log(values)
                updateProfile(auth.currentUser, {
                  fullName: values.fullName,
                  phoneNumber: values.phoneNumber
                }).then((res) => {
                  console.log(res)
                  localStorage.setItem(
                    'userInfo',
                    JSON.stringify({
                      isAuth: true,
                      user: res
                    })
                  )
                })
              }}
            >
              <Form.Item label='Full Name' name='fullName'>
                <Input></Input>
              </Form.Item>
              <Form.Item label='Phone Number' name='phoneNumber'>
                <Input></Input>
              </Form.Item>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane key={'2'} tabKey='2' tab={'Change Password'}>
          <ChangePassword />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Profile
