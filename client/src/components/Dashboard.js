import React,{useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import {logout} from '../Action-Creator/auth.creator';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: 600,
    padding: theme.spacing(7)
  },
  buttonStyle: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const { token, user } = authState;
  const history = useHistory();
  const [name,setName] = React.useState('');

  useEffect(()=> {
    if(!token) {
      history.push('/');
    }
  },[token]);

  useEffect(() => {
    if(localStorage.getItem('user')) {
      const x = JSON.parse(localStorage.getItem('user'));
      setName(x.name);
    }
  },[])
    return (
    <Card className={classes.root}>
      <CardContent>
        <Box className={classes.buttonStyle}>
          <Link color="primary" component={RouterLink} onClick={() => {
            dispatch(logout());
          }} variant="body1">Logout</Link>
        </Box>
         <br/>
        <Box>
          <Typography variant="h3" color="primary">Dashboard *</Typography>
          <FormHelperText>Its a simple dashboard for testing purpose.</FormHelperText>
        </Box>
        <br/> <br/>
        <Box>
          <Typography variant="h5" color="primary"> Welcome </Typography>
            {
              name ? <FormHelperText>{name}</FormHelperText> : null
            }
        </Box>

      </CardContent>
    </Card>
  )
}

export default Dashboard;
