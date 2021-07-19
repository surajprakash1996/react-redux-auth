import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import {useForm} from 'react-hook-form';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../Action-Creator/auth.creator';
import {useHistory} from 'react-router-dom';

const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const useStyles = makeStyles(theme => ({
  root: {
    width: 600,
    padding: theme.spacing(7)
  },
  buttonStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const errorState = useSelector(state => state.error);
  const { token } = authState;
  const { msg,id } = errorState;
  const history = useHistory();
  const {register, errors, handleSubmit} = useForm({mode: 'onChange'});

  const onSubmit = (data) => {
    dispatch(login({
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
            <Typography variant="h5" color="primary">Login *</Typography>
            <FormHelperText>Please enter correct email and password.</FormHelperText>
          </Box>
          <br/>
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
          <br/>
          <Box className={classes.buttonStyle}>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Typography variant="subtitle2">
              Don't have an Account ? {" "}
              <Link component={RouterLink} to={"/register"} variant="body2">Register</Link>
            </Typography>
          </Box>
          <br/>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login;
