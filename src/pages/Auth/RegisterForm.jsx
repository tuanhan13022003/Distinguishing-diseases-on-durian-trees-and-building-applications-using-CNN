// import { Link, useNavigate } from 'react-router-dom'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Avatar from '@mui/material/Avatar'
// import LockIcon from '@mui/icons-material/Lock'
// import Typography from '@mui/material/Typography'
// import { Card as MuiCard } from '@mui/material'
// import ReactIcon from '~/assets/react.svg?react'
// import CardActions from '@mui/material/CardActions'
// import TextField from '@mui/material/TextField'
// import Zoom from '@mui/material/Zoom'
// import { useForm } from 'react-hook-form'
// import {
//   FIELD_REQUIRED_MESSAGE,
//   EMAIL_RULE,
//   EMAIL_RULE_MESSAGE,
//   PASSWORD_RULE,
//   PASSWORD_RULE_MESSAGE,
//   PASSWORD_CONFIRMATION_MESSAGE
// } from '~/utils/validators'
// import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
// import { registerUserAPI } from '~/apis'
// import { toast } from 'react-toastify'

// function RegisterForm() {
//   const { register, handleSubmit, formState: { errors }, watch } = useForm()
//   const navigate = useNavigate()

//   const submitRegister = (data) => {
//     const { name, email, password } = data
//     toast.promise(registerUserAPI({ name, email, password }), {
//       pending: 'Registering is in progress...'
//     }).then((user) => {
//       navigate(`/login?registeredEmail=${user.email}`)
//     })
//   }

//   return (
//     <form onSubmit={handleSubmit(submitRegister)}>
//       <Zoom in={true} style={{ transitionDelay: '200ms' }}>
//         <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
//           <Box sx={{
//             margin: '1em',
//             display: 'flex',
//             justifyContent: 'center',
//             gap: 1
//           }}>
//             <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
//             <Avatar sx={{ bgcolor: 'primary.main' }}><ReactIcon /></Avatar>
//           </Box>
//           <Box sx={{
//             marginTop: '1em',
//             display: 'flex',
//             justifyContent: 'center',
//             color: theme => theme.palette.grey[500]
//           }}>
//             Author: KhiemAM
//           </Box>
//           <Box sx={{ padding: '0 1em 1em 1em' }}>
//             <Box sx={{ marginTop: '1em' }}>
//               <TextField
//                 autoFocus
//                 fullWidth
//                 label='Name...'
//                 type='text'
//                 variant='outlined'
//                 error={!!errors['name']}
//                 {...register('name', {
//                   required: FIELD_REQUIRED_MESSAGE
//                 })}
//               />
//               <FieldErrorAlert errors={errors} fieldName='name' />
//             </Box>
//             <Box sx={{ marginTop: '1em' }}>
//               <TextField
//                 autoFocus
//                 fullWidth
//                 label='Enter Email...'
//                 type='text'
//                 variant='outlined'
//                 error={!!errors['email']}
//                 {...register('email', {
//                   required: FIELD_REQUIRED_MESSAGE,
//                   pattern: {
//                     value: EMAIL_RULE,
//                     message: EMAIL_RULE_MESSAGE
//                   }
//                 })}
//               />
//               <FieldErrorAlert errors={errors} fieldName='email' />
//             </Box>
//             <Box sx={{ marginTop: '1em' }}>
//               <TextField
//                 autoFocus
//                 fullWidth
//                 label='Enter Password...'
//                 type='password'
//                 variant='outlined'
//                 error={!!errors['password']}
//                 {...register('password', {
//                   required: FIELD_REQUIRED_MESSAGE,
//                   pattern: {
//                     value: PASSWORD_RULE,
//                     message: PASSWORD_RULE_MESSAGE
//                   }
//                 })}
//               />
//               <FieldErrorAlert errors={errors} fieldName='password' />
//             </Box>
//             <Box sx={{ marginTop: '1em' }}>
//               <TextField
//                 autoFocus
//                 fullWidth
//                 label='Enter Password Confirmation...'
//                 type='password'
//                 variant='outlined'
//                 error={!!errors['password_confirmation']}
//                 {...register('password_confirmation', {
//                   validate: (value) => {
//                     if (value === watch('password')) return true
//                     return PASSWORD_CONFIRMATION_MESSAGE
//                   }
//                 })}
//               />
//               <FieldErrorAlert errors={errors} fieldName='password_confirmation' />
//             </Box>
//           </Box>
//           <CardActions>
//             <Button
//               className='interceptor-loading'
//               type='submit'
//               variant='contained'
//               color='primary'
//               size='large'
//               fullWidth
//             >
//               Register
//             </Button>
//           </CardActions>
//           <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
//             <Typography>Already have an account</Typography>
//             <Link to='/login'>
//               <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>
//                 Log in!
//               </Typography>
//             </Link>
//           </Box>
//         </MuiCard>
//       </Zoom>
//     </form>
//   )
// }

// export default RegisterForm




import { Link, useNavigate } from 'react-router-dom'
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
import { useForm } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { registerUserAPI } from '~/apis'
import { toast } from 'react-toastify'

function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const navigate = useNavigate()

  const submitRegister = (data) => {
    const { username, email, full_name, phone_number, address, password } = data
    toast.promise(registerUserAPI({ username, email, full_name, phone_number, address, password }), {
      pending: 'Registering is in progress...'
    }).then((user) => {
      navigate(`/login?registeredEmail=${user.email}`)
    }).catch((error) => {
      toast.error(`Registration failed: ${error.response.data.detail}`)
    })
  }

  return (
    <form onSubmit={handleSubmit(submitRegister)}>
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
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label='Username'
                type='text'
                variant='outlined'
                error={!!errors['username']}
                {...register('username', { required: FIELD_REQUIRED_MESSAGE })}
              />
              <FieldErrorAlert errors={errors} fieldName='username' />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label='Full Name'
                type='text'
                variant='outlined'
                error={!!errors['full_name']}
                {...register('full_name', { required: FIELD_REQUIRED_MESSAGE })}
              />
              <FieldErrorAlert errors={errors} fieldName='full_name' />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label='Phone Number'
                type='text'
                variant='outlined'
                error={!!errors['phone_number']}
                {...register('phone_number', { required: FIELD_REQUIRED_MESSAGE })}
              />
              <FieldErrorAlert errors={errors} fieldName='phone_number' />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label='Address'
                type='text'
                variant='outlined'
                error={!!errors['address']}
                {...register('address', { required: FIELD_REQUIRED_MESSAGE })}
              />
              <FieldErrorAlert errors={errors} fieldName='address' />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label='Email'
                type='text'
                variant='outlined'
                error={!!errors['email']}
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='email' />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label='Password'
                type='password'
                variant='outlined'
                error={!!errors['password']}
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: PASSWORD_RULE, message: PASSWORD_RULE_MESSAGE }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='password' />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label='Password Confirmation'
                type='password'
                variant='outlined'
                error={!!errors['password_confirmation']}
                {...register('password_confirmation', {
                  validate: (value) => value === watch('password') || PASSWORD_CONFIRMATION_MESSAGE
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='password_confirmation' />
            </Box>
          </Box>
          <CardActions>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              fullWidth
            >
              Register
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>Already have an account?</Typography>
            <Link to='/login'>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>
                Log in!
              </Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default RegisterForm
