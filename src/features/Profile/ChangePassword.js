import { Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { updatePassword } from 'firebase/auth'
import { auth } from '../../fire/fire'

export const ChangePassword = () => {
  const [form] = useForm()
  return (
    <Form
      layout='vertical'
      form={form}
      style={{ width: 700 }}
      onFinish={(values) => {
        if (values.password !== values.confirmPassword) {
          message.error('Mật khẩu không giống nhau')
        } else {
          updatePassword(auth.currentUser, values.password).then(() => {
            message.info('Thay đổi mật khẩu thành công!')
            form.resetFields()
          })
        }
      }}
    >
      <Form.Item label='New Password' name='password'>
        <Input type='password' />
      </Form.Item>
      <Form.Item label='Confirm New Password' name='confirmPassword'>
        <Input type='password' />
      </Form.Item>
      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </Form>
  )
}
