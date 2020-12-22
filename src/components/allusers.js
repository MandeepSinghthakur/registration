import React,{useEffect,useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


// see if we can move it to ots own component
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { userService } from '../services/userService';
import base64Convert from '../utils/base64Convert'
import { isLoggedIn } from '../utils/auth'
import { getNewValues } from '../utils/getNewValues'
import { Link,useHistory } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '56ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

export default function AllUsers() {
  const classes = useStyles();
  const history = useHistory();
  const [users,setUsers] =useState([])
  const [isOpen,setOpen] =useState(false)
  const [fileSelected,setFileSelected]=useState('')
  const [open, setBackOpen] = useState(false);
  const [currentUser,setCurrentUser] = useState({})
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')
  const [password,setPassword]=useState('')

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
  useEffect(()=> {
    const userIn = isLoggedIn()
    if(userIn === "false") {
       history.push('/')
    } else {
      getAll()
    }
  },[])

  function getAll(){
  	setBackOpen(true)
  	userService.getAll().then(function(result){
      setUsers(result)
      setBackOpen(false)
    })
  }

  function handleUpdate(){
    setBackOpen(true)
    let baseImage;
  	const payload = {
  		firstName:getNewValues(currentUser.firstName, firstName),
  		lastName:getNewValues(currentUser.lastNameS, lastName),
  		phoneNumber:getNewValues(currentUser.phoneNumber, phoneNumber),
  		password:getNewValues(currentUser.password, password),
  		email:currentUser.email,
      id:currentUser._id
    }
    axios.put('/update', {
            formdata:payload,
            imageData: fileSelected ? fileSelected:currentUser.imageData
          })
      .then(function (response) {
         setBackOpen(false)
         handleClose(true)
         getAll()
      })
      .catch(function (error) {
         setBackOpen(false)
         handleClose(true)
        console.log(error);
      });
  }

  function handleClickOpen(u){
  	setCurrentUser(u)
  	console.log(u)
  	setOpen(true)
  }

  function handleClose(){
  	setOpen(false)
  }

  function deleteItem(u){
    setBackOpen(true)
    console.log(u._id)
  	const payload = {id:u._id}
  	userService.deleteItem(payload).then(function(result){
      if(result.data.message){
      	let newUsers = users.filter((user) => user.email !== u.email)
        setBackOpen(false)
      	setUsers(newUsers)
      }
    })
  }

  const listItems =  users.map((u,index)=> <>
    	<ListItem alignItems="flex-start" key={index}>
        <ListItemAvatar>
          <Avatar alt="{u.firstName}" src={u.imageData} />
        </ListItemAvatar>
        <ListItemText
          primary={u.firstName + ' ' + u.lastName}
          secondary={
            <React.Fragment>
              {u.email} {u.phoneNumber}
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
              <Button color="primary" onClick={() => deleteItem(u)}> Delete </Button>
              <Button color="primary" onClick={() => handleClickOpen(u)}> Edit </Button>
          </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>)

  return (
  <>
    <List className={classes.root}>
    {listItems}
    </List>
    <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Want to update User Info?"}</DialogTitle>
        <DialogContent>
           <form  noValidate autoComplete="off">
          <Grid container spacing={3}>
       		 <Grid item xs={12}>
		  		<TextField  id="outlined-basic" fullWidth multiline defaultValue={currentUser.firstName} InputLabelProps={{ shrink: true }} label="First Name" variant="outlined" name="firstName" onChange={handleChange}/>
		  	</Grid>

		  	<Grid item xs={12}>
		  <TextField  id="outlined-basic" fullWidth multiline label="Last Name" defaultValue={currentUser.lastName} InputLabelProps={{ shrink: true }} name="lastName" variant="outlined" onChange={handleChange}/>
		  </Grid>

		  <Grid item xs={12}>
		  <TextField id="outlined-basic" fullWidth multiline label="Phone Number" defaultValue={currentUser.phoneNumber} InputLabelProps={{ shrink: true }} name="phoneNumber" variant="outlined" onChange={handleChange}/>
		   </Grid>

        <Grid item xs={12}>
      <TextField  id="outlined-basic" fullWidth multiline label="Password" defaultValue={currentUser.password} InputLabelProps={{ shrink: true }} name="password" variant="outlined" onChange={handleChange}/>
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
		    Upload New Profile Image 
		  </Button>

		</label> 
		</Grid>
		</Grid>
		</form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
       <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
   </>
  );
}