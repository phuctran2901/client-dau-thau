import { Avatar, Layout, notification } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import './Home.style.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ContextAuth } from '../../context/AuthContext'
export const Home = () => {
  const navigate = useNavigate()
  const [isAuth] = useContext(ContextAuth)
  return (
    <Layout style={{ backgroundColor: '#E8F1FF', height: '100vh' }}>
      {/* <Header
        style={{ backgroundColor: 'white', boxShadow: '6px 0px 3px 1px black' }}
      >
        <div className='header-wrap'>
          <div></div>
          <div className='title-text'>Phần mềm tra cứu thông tin đấu thầu</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <span
              style={{
                marginRight: 10,
                fontWeight: 'bold',
                color: 'rgb(64, 129, 236)'
              }}
            >
              Hoàng Phúc
            </span>
            <Avatar />
          </div>
        </div>
      </Header> */}
      <Content style={{ position: 'relative' }}>
        <div
          style={{
            width: '1000px',
            position: 'absolute',
            left: '50%',
            top: '40%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            className='box'
            onClick={() => {
              if (isAuth.user.role === 'admin') {
                navigate('/users')
              } else {
                notification.info({
                  message: 'Thất bại',
                  message: 'Bạn không có quyền truy cập!'
                })
              }
            }}
          >
            <div className='box-detail'>
              <UserOutlined style={{ fontSize: 48, color: 'white' }} />
              <p>Users</p>
            </div>
          </div>
          <div className='box' onClick={() => navigate('/search')}>
            <div className='box-detail'>
              <SearchOutlined style={{ fontSize: 48, color: 'white' }} />
              <p>Search</p>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default Home
