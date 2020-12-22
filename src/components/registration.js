import React,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader  from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import { Link,useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import base64Convert from '../utils/base64Convert'


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
  	flex:'auto'
  },
  button:{
  	backgroundColor:'blueviolet',
  	color:"white"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  actions:{
    justifyContent: 'flex-end',
    color:'blue'
  }
}));

export default function Registration(props) {
  const classes = useStyles();
  const history = useHistory();
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')
  const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')
  const [fileSelected,setFileSelected]=useState('')
  const [open, setOpen] = React.useState(false);

  function handleChange(event){
  	let value = event.target.value	
     	switch(event.target.name) {
     		case 'firstName':
     		setFirstName(value)
     		break;
      		case 'lastName':
     		setLastName(value)
     		break;		
     		case 'phoneNumber':
     		setPhoneNumber(value)
     		break;
     		case 'email':
     		setEmail(value)
     		break;	
        case 'password':
        setPassword(value)
        break;    	
     	}
  }

  function handleProfileUpload(event) {
     base64Convert(event.target.files[0]).then( (val) => 
      setFileSelected(val)
    );
  }

  function handleRegister(){
    setOpen(true)
    let baseImage;
  	const payload = {
  		firstName:firstName,
  		lastName:lastName,
  		phoneNumber:phoneNumber,
  		email:email,
      password:password
    }

    axios.post('/register', {
            formdata:payload,
            imageData: fileSelected
          })
      .then(function (response) {
        setOpen(false)
         history.push('/')
      })
      .catch(function (error) {
        setOpen(false)
        console.log(error);
      });
  }

  return (
    <>
    <Card className={classes.root}>
    <CardHeader>Registration</CardHeader>
      <CardContent className={classes.maxContainer}>
        <form  noValidate autoComplete="off">
          <Grid container spacing={3}>
       		 <Grid item xs={12}>
		  		<TextField  id="outlined-basic" fullWidth multiline label="First Name" variant="outlined" name="firstName" onChange={handleChange}/>
		  	</Grid>

		  	<Grid item xs={12}>
		  <TextField  id="outlined-basic" fullWidth multiline label="Last Name" name="lastName" variant="outlined" onChange={handleChange}/>
		  </Grid>

		  <Grid item xs={12}>
		  <TextField id="outlined-basic" fullWidth multiline label="Phone Number" name="phoneNumber" variant="outlined" onChange={handleChange}/>
		   </Grid>

		  	<Grid item xs={12}>
		  <TextField  id="outlined-basic" fullWidth multiline label="Email" name="email" variant="outlined" onChange={handleChange}/>
		 	</Grid>


        <Grid item xs={12}>
      <TextField  id="outlined-basic" fullWidth multiline label="Password" name="password" variant="outlined" onChange={handleChange}/>
      </Grid>

		 	<Grid item xs={12}>
		  <input
		  accept="image/*"
		  className={classes.input}
		  style={{ display: 'none' }}
		  id="raised-button-file"
		  multiple
		  name="profileUrl"
		  onChange={handleProfileUpload}
		  type="file"
		/>
		<label htmlFor="raised-button-file">
		  <Button  variant="raised" component="span" className={classes.button}>
		    Upload Profile Image 
		  </Button>

		</label> 
		</Grid>
		</Grid>
		</form>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button className={classes.button}  variant="raised" color="primary" className="btn btn-link" onClick={handleRegister}>Register</Button>
      </CardActions>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
    <Link exact to="/login" className="btn btn-link" className={classes.registerbtn}>Already Registered ? Login here</Link>
    </>
  );
}
