import React,{useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useForm} from 'react-hook-form';
import { Link as RouterLink , useHistory} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import {useSelector, useDispatch} from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { registerForm } from '../Action-Creator/auth.creator';

lconst regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regexPhone = /^[7-9][0-9]{9}$/

const useStyles = makeStyles(theme => ({
  root: {
    width: 600,
    padding: theme.spacing(7)
  },
  buttonStyle: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end'
  }
}));

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const errorState = useSelector(state => state.error);
  const { token } = authState;
  const { msg,id } = errorState;
  const history = useHistory();

  const {register, errors, handleSubmit, getValues} = useForm({
      mode:'onChange'
  });
  
  const onSubmit = (data) => {
    dispatch(registerForm({
      name:data.name,
      gender:data.gender,
      phone:data.phone,
      email:data.email,
      password: data.password
    }))
  }

  useEffect (() => {
    if(token) {
      history.push('/dashboard');
    }
  },[token])

  return (
    <Card className={classes.root}>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
         {
            id ? (
              <React.Fragment>
                <Box>
                  <Alert variant="filled" severity="error"> {msg.msg}</Alert>
                </Box>
                <br/>
              </React.Fragment>
            ) : null
          }
          <Box>
            <Typography variant="h5" color="primary">Register *</Typography>
            <FormHelperText>Please fill form carefully.</FormHelperText>
          </Box>
          <br/>
          <Box>
            <TextField
              margin="dense"
              fullWidth
              type="text"
              name="name"
              label="Username"
              error={Boolean(errors.name)}
              helperText={errors.name
              ? errors.name.message
              : null}
              inputRef={register({
              required: 'Fullname is Required.',
              minLength: {
                value: 3,
                message: 'Minimum Length 3 Characters.'
              },
              maxLength: {
                value: 20,
                message: 'Maximum Length 12 Characters.'
              }
            })}
              placeholder="Enter Your Fullname *"/>
          </Box>
       
          <Box>
            <TextField
             margin="dense"
              fullWidth
              type="email"
              name="email"
              label="Email Address"
              error={Boolean(errors.email)}
              helperText={errors.email
              ? errors.email.message
              : null}
              inputRef={register({
              required: 'Email Address is Required.',
              pattern: {
                value: regexEmail,
                message: 'Invalid Format.'
              }
            })}
              placeholder="Enter Your Email Address *"/>
          </Box>
        
          <Box>
            <TextField
             margin="dense"
              fullWidth
              type="phone"
              name="phone"
              label="Phone Number"
              error={Boolean(errors.phone)}
              helperText={errors.phone
              ? errors.phone.message
              : null}
              inputRef={register({
              required: 'Phone Number is Required.',
              pattern: {
                value: regexPhone,
                message: 'Invalid Format.'
              }
            })}
              placeholder="Enter Your Phone Address *"/>
          </Box>
          <br/>
          <Box>
            <FormControl component="fieldset" error={Boolean(errors.gender)}>
              <FormLabel component="legend">Gender *</FormLabel>
              <RadioGroup row name="gender">
                <FormControlLabel
                  value="male"
                  control={< Radio inputRef = {
                  register({required: 'Gender is Required.'})
                } />}
                  label="Male"/>
                <FormControlLabel
                  value="female"
                  control={< Radio inputRef = {
                  register({required: 'Gender is Required.'})
                } />}
                  label="Female"/>
                <FormControlLabel
                  value="other"
                  control={< Radio inputRef = {
                  register({required: 'Gender is Required.'})
                } />}
                  label="Other"/>
              </RadioGroup>
              <FormHelperText>{errors.gender
                  ? errors.gender.message
                  : null}</FormHelperText>
            </FormControl>
          </Box>
    
          <Box>
            <TextField
             margin="dense"
              fullWidth
              type="password"
              name="password"
              label="Password"
              error={Boolean(errors.password)}
              helperText={errors.password
              ? errors.password.message
              : null}
              inputRef={register({required: 'Password is Required.'})}
              placeholder="Enter Your Password *"/>
          </Box>
        
          <Box>
            <TextField
             margin="dense"
              fullWidth
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword
              ? errors.confirmPassword.message
              : null}
              inputRef={register({
              required: 'Confirm Password is Required.',
              validate: (value) => {
                if (value === getValues('password')) {
                  return true
                } else {
                  return 'Password Does Not Match.'
                }
              }
            })}
              placeholder="Confirm Password *"/>
          </Box>
          <br/>
          <Box className={classes.buttonStyle}>
            <Button type="submit" variant="contained" color="primary">Login</Button>
            <Typography variant="subtitle2">
              I have an Account ? {" "} <Link component={RouterLink} to={'/'} variant="body2">Login</Link> 
            </Typography>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}

export default Register
