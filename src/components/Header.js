import { ArrowLeftOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ContextAuth } from '../context/AuthContext'

export const HeaderCustom = () => {
  const [isAuth, setIsAuth] = useContext(ContextAuth)
  const navigate = useNavigate()
  const location = useLocation()
  console.log(isAuth)
  return (
    <Header
      style={{
        backgroundColor: 'white',
        boxShadow: '6px 0px 3px 1px black',
        zIndex: 3
      }}
    >
      <div className='header-wrap'>
        <div>
          {location.pathname !== '/' && (
            <Button onClick={() => navigate(-1)}>
              <ArrowLeftOutlined style={{ fontSize: 22 }} />
            </Button>
          )}
        </div>
        {/* {window.location.pathname === '/' && (
          <div className='title-text'>Phần mềm tra cứu thông tin đấu thầu</div>
        )} */}

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
            {isAuth?.user?.fullName}
          </span>
          <div style={{ cursor: 'pointer' }}>
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  {
                    key: 1,
                    label: 'Profile'
                  },
                  {
                    key: 2,
                    label: 'Đăng xuất',
                    onClick: () => {
                      localStorage.removeItem('userInfo')
                      setIsAuth({ isAuth: false })
                      navigate('/login')
                    }
                  }
                ]
              }}
            >
              <Avatar />
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  )
}

export default HeaderCustom
