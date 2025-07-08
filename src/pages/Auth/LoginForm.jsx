import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import ReactIcon from '~/assets/react.svg?react'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [searchParams] = useSearchParams()
  const { verifiedEmail, registeredEmail } = Object.fromEntries([...searchParams])

  const submitLogin = (data) => {
    const { email, password } = data

    toast.promise(
      dispatch(loginUserAPI({ email, password })),
      { pending: 'Đang đăng nhập...' }
    ).then((res) => {
      if (!res.error) navigate('/')
    })
  }

  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard
          sx={{
            minWidth: 380,
            maxWidth: 380,
            backgroundColor: 'rgba(219, 220, 212, 0.46)', 
            backdropFilter: 'blur(12px)', 
            borderRadius: 2,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
          }}
        >

          <Box sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}><ReactIcon /></Avatar>
          </Box>
          <Box sx={{
            marginTop: '1em',
            display: 'flex',
            justifyContent: 'center',
            color: theme => theme.palette.grey[500]
          }}>

          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '0 1em'
          }}>
            {verifiedEmail &&
              <Alert severity='success' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                Your email&nbsp;
                <Typography variant='span' sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
                  {verifiedEmail}
                </Typography>
                &nbsp;has been verified.<br />Now you can login to enjoy our services: Have a good day!
              </Alert>
            }
            {registeredEmail &&
              <Alert severity='info' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                An email has been sent to&nbsp;
                <Typography variant='span' sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
                  {registeredEmail}
                </Typography>
                <br />Please check and verify your account before logging in!
              </Alert>
            }
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                autoFocus
                fullWidth
                label='Nhập email'
                type='text'
                variant='outlined'
                error={!!errors['email']}
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='email' />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                autoFocus
                fullWidth
                label='Nhập mật khẩu'
                type='password'
                variant='outlined'
                error={!!errors['password']}
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='password' />
            </Box>
          </Box>
          <CardActions>
            <Button
              className='interceptor-loading'
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              fullWidth
            >
              Đăng nhập
            </Button>
          </CardActions>
          <Box sx={{ padding: '0em 1em 1em 1em', textAlign: 'center' }}>
            <Link to='/register'>
              <Typography sx={{  '&:hover': { color: '#ffbb39' } }}>
                Tạo tài khoản!
              </Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm