import * as React from 'react';
import {useState , useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import './Signup.css'
import insta from "../Assets/img_1.png";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {Link , useNavigate } from "react-router-dom"
import {Authcontext} from "../context/AuthContext" 
import  { database,storage } from "../Firebase"


export default function SignUp() {
    const useStyles = makeStyles({
        text1:{
            color:'grey',
            textAlign: 'center'
        },
        card2:{
          height: '5vh',
          marginTop: '2%'

        }

    })
    const classes = useStyles();
    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');
    const[name , setName] = useState('');
    const[file ,  setFile] = useState('');
    const[error , setError]  = useState('');
    const[loading,setLoading] = useState(false);
    const history = useNavigate();
    const{signup}= useContext(Authcontext);

    const handleClick = async()=>{
      if(file == null)
      {
        setError("Please upload profile Image first!");
        setTimeout(()=>{ // 2 sec baad error gyb kr dena
          setError('')
        },2000)
        return;
      }
      try{
        setError('');
        setLoading(true);
        let userObj = await signup(email,password)
        let uid = userObj.user.uid
            //upload function
           
             const uploadtask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
                uploadtask.on('state_changed',fn1,fn2,fn3);//listener fn1 , fn2 , fn3  

               //fn1->progress
             function fn1(snapshot){
                 let progress = (snapshot.bytesTransferred/snapshot.totalBytes) *100
                 console.log(`upload is ${progress} % done. `)
             }

         //fn2-> error
         function fn2(error){
          setError(error);
          setTimeout(()=>{ // 2 sec baad error gyb kr dena
            setError('')
          },2000);
          setLoading(false);
          return;
            
         }
          //fn3->success
          function fn3(){
              uploadtask.snapshot.ref.getDownloadURL().then((url)=>{
                  console.log(url);
                  database.users.doc(uid).set({
                    email : email,
                    userId: uid ,
                    fullname : name,
                    profileUrl : url,
                    createdAt : database.getTimeStamp()

                  })
              })
            setLoading(false);
            history('/')   // age jao signup ho chuke ho
          }
        
      }catch(err){
        setError(err);
        setTimeout(()=>{ // 2 sec baad error gyb kr dena
          setError('')
        },2000)
        

      }
    }


  return (
      <div className='signupWrapper'>
        <div className='signupCard'>
          <Card variant = "outlined">
              <div className='insta-logo'>
                  <img src = {insta} alt=""/>

              </div>
      
        
        <CardContent>
          <Typography className = {classes.text1} variant="subtitle2" >
            SignUp to see photos and videos from your friends
          </Typography>


          {error!=='' && <Alert severity="error">{error}</Alert>}




          <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}  />
          <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small"  value={password} onChange={(e)=>setPassword(e.target.value)} />
          <TextField id="outlined-basic" label="Full-Name" variant="outlined" fullWidth={true} margin="dense" size="small" value={name} onChange={(e)=>setName(e.target.value)} />

          <Button size="small" color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CloudUploadIcon />} component="label" >
          Upload profile Image
          <input type="file" accept='image/*' hidden onChange={(e)=>setFile(e.target.files[0])} ></input>
        </Button>

         
        </CardContent>
     
      <CardActions>
        <Button color="primary"  fullWidth={true}  variant="contained" disabled={loading}  onClick={handleClick}>
          Sign Up
        </Button>
      </CardActions>
      <CardContent>
          <Typography className = {classes.text1} variant="subtitle2" >
           By signing up you agree to our Terms , Conditions and Cookies policy 
          </Typography>
        </CardContent>

      </Card>

      <Card variant="outlined" className ={classes.card2} >
      <CardContent>
          <Typography className = {classes.text1} variant="subtitle2" >
           Having an account? <Link to="/Login" style={{textDecoration : "none"}} >LogIn</Link>
          </Typography>
        </CardContent>

      </Card>


    </div>


      </div>

    
    
    
  );
}
