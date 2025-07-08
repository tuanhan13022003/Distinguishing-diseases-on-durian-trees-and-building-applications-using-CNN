import { useLocation, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'


function Auth() {
  const location = useLocation()

  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  const currentUser = useSelector(selectCurrentUser)
  if (currentUser) {
    return <Navigate to='/' replace={true}/>
  }

  return (
    <Box
  sx={{
    minHeight: '100vh',
    width: '100%',
    backgroundImage: 'url(src/assets/auth/login-register-bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

  }}
>
  <Box sx={{ zIndex: 1 }}>
    {isLogin && <LoginForm />}
    {isRegister && <RegisterForm />}
  </Box>
</Box>

  )
}

export default Auth
