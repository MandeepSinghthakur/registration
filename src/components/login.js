import React,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader  from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import { userService } from '../services/userService';
import { logIn, logOut, isLoggedIn } from '../utils/auth'


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  maxContainer:{
    maxWidth:565,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '25'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  registerbtn:{
  	flex:'auto',
  	backgroundColor:'blue',
  	color:"white",
  	marginLeft: 8,
    height: 33,
    textAlign: 'inherit',
    textDecoration: 'none',
    textAlign: 'center',
    paddingTop: '1',
    lineHeight: '2'
  },
  loginbtn:{
  	flex:'auto',
  	backgroundColor:'blueviolet',
  	color:"white"
  },
  button:{
  	backgroundColor:'blueviolet',
  	color:"white"
  }
}));

export default function Login(props) {
  const history = useHistory();
  const classes = useStyles();
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  useEffect(()=>{
   const userIn = isLoggedIn()
    if(userIn === "false") {
       history.push('/')
    } else {
      history.push('/all')
    }
  },[])

  function handleChange(event){
  	let value = event.target.value	
     	switch(event.target.name) {
     		case 'email':
     		setEmail(value)
     		break;	
        case 'password':
        setPassword(value)
        break;    	
     	}
  }

  function handleLogin(){
    const payload = {
    	email:email,
    	password:password
    }
    userService.login(payload).then(function(result){
      if(Object.keys(result.data).length === 0 || result.data.error) {
        logOut()
         history.push('/login')
      }
      else {
        logIn()
        history.push('/all')
      }
    })
  }

  return (
    <Card className={classes.root}>
    <CardHeader>Registration</CardHeader>
      <CardContent className={classes.maxContainer}>
        <form  noValidate autoComplete="off">
          <Grid container spacing={3}>
		  	<Grid item xs={12}>
		  <TextField  id="outlined-basic" fullWidth label="Email" name="email" variant="outlined" onChange={handleChange}/>
		 	</Grid>


        <Grid item xs={12}>
      <TextField  id="outlined-basic" fullWidth label="Password" name="password" variant="outlined" onChange={handleChange}/>
      </Grid>
		</Grid>
		</form>
      </CardContent>
      <CardActions >
        <Button  variant="raised" component="span" className={classes.loginbtn} color="primary" onClick={handleLogin}>Login</Button>
         <Link exact to="/register" className="btn btn-link" className={classes.registerbtn}>Not a User? Register Here</Link>

      </CardActions>  
    </Card>
  );
}
