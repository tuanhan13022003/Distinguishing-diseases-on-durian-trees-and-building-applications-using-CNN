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
      { pending: 'Logging in...' }
    ).then((res) => {
      if (!res.error) navigate('/')
    })
  }

  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
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
                label='Enter Email'
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
                label='Enter Password'
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
              Login
            </Button>
          </CardActions>
          <Box sx={{ padding: '0em 1em 1em 1em', textAlign: 'center' }}>
            <Link to='/register'>
              <Typography sx={ { color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>
                Create an account!
              </Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm



// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import LockIcon from '@mui/icons-material/Lock';
// import Typography from '@mui/material/Typography';
// import { Card as MuiCard } from '@mui/material';
// import CardActions from '@mui/material/CardActions';
// import TextField from '@mui/material/TextField';
// import Zoom from '@mui/material/Zoom';
// import Alert from '@mui/material/Alert';
// import { useForm } from 'react-hook-form';
// import FieldErrorAlert from '~/components/Form/FieldErrorAlert';
// import { Link, useSearchParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUserAPI, selectLoading, selectError } from '~/redux/user/userSlice';
// import { toast } from 'react-toastify';

// function LoginForm() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);

//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [searchParams] = useSearchParams();
//   const { verifiedEmail, registeredEmail } = Object.fromEntries([...searchParams]);

//   const submitLogin = async (data) => {
//     const { username, password } = data;
//     try {
//       const result = await dispatch(loginUserAPI({ username, password }));
//       if (!result.error) {
//         toast.success('Đăng nhập thành công!');
//         navigate('/');
//       } else {
//         toast.error(result.error.message || 'Đăng nhập thất bại.');
//       }
//     } catch (err) {
//       toast.error('Lỗi hệ thống. Vui lòng thử lại.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(submitLogin)}>
//       <Zoom in={true} style={{ transitionDelay: '200ms' }}>
//         <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em', padding: '1em' }}>
//           <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, marginBottom: '1em' }}>
//             <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
//             <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
//               Đăng nhập
//             </Typography>
//           </Box>

//           <Box sx={{ padding: '0 1em 1em 1em' }}>
//             {error && (
//               <Alert severity='error' sx={{ marginBottom: '1em' }}>
//                 {error}
//               </Alert>
//             )}
//             {verifiedEmail && (
//               <Alert severity='success' sx={{ marginBottom: '1em' }}>
//                 Email {verifiedEmail} đã được xác minh! Vui lòng đăng nhập.
//               </Alert>
//             )}
//             {registeredEmail && (
//               <Alert severity='info' sx={{ marginBottom: '1em' }}>
//                 Vui lòng kiểm tra email {registeredEmail} để xác minh tài khoản.
//               </Alert>
//             )}

//             <TextField
//               fullWidth
//               label='Username'
//               variant='outlined'
//               error={!!errors['username']}
//               helperText={errors['username'] ? errors['username'].message : ''}
//               {...register('username', { required: 'Vui lòng nhập tên đăng nhập' })}
//               sx={{ marginBottom: '1em' }}
//             />

//             <TextField
//               fullWidth
//               label='Password'
//               type='password'
//               variant='outlined'
//               error={!!errors['password']}
//               helperText={errors['password'] ? errors['password'].message : ''}
//               {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
//               sx={{ marginBottom: '1em' }}
//             />

//             <CardActions>
//               <Button
//                 className='interceptor-loading'
//                 type='submit'
//                 variant='contained'
//                 color='primary'
//                 size='large'
//                 fullWidth
//                 disabled={loading}
//               >
//                 {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
//               </Button>
//             </CardActions>

//             <Box sx={{ padding: '1em', textAlign: 'center' }}>
//               <Link to='/register'>
//                 <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>
//                   Tạo tài khoản mới
//                 </Typography>
//               </Link>
//             </Box>
//           </Box>
//         </MuiCard>
//       </Zoom>
//     </form>
//   );
// }

// export default LoginForm;
