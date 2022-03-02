import * as React from 'react';
import { useContext , useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext , Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { makeStyles } from '@mui/styles';
import './Login.css'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {Link , useNavigate} from "react-router-dom"
import { eventWrapper } from '@testing-library/user-event/dist/utils';

import insta from "../Assets/img_1.png";
import mobile from "../Assets/mobile.jpg";
import img1 from "../Assets/img1.png";
import img2 from "../Assets/img2.png";
import img3 from "../Assets/img3.png";
import img4 from "../Assets/img4.png";
import img5 from "../Assets/img5.png";


import { Authcontext } from '../context/AuthContext';



export default function LogIn() {

  const store = useContext(Authcontext)
  console.log(store);



    const useStyles = makeStyles({
        text1:{
            color:'grey',
            textAlign: 'center'
        },
        card2:{
          height: '5vh',
          marginTop: '2%'

        },
        text2:{
          textAlign: 'center'
        }

    })
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const history = useNavigate();

    const {login} = useContext(Authcontext);

    const handleClick = async()=>{
      try{
        setError('');
        setLoading(true);
        let res = await login(email,password);
        setLoading(false);
        history('/');
      }catch(err){
        setError(err);
        setTimeout(()=>{ // 2 sec baad error gyb kr dena
          setError('')
        },2000);
        setLoading(false);
      }

    }



  return (
      <div className='LoginWrapper'>
        <div className='imgcar' style={{backgroundImage:'url('+mobile+')',backgroundSize:'cover'}}>
          <div className='car'>
          <CarouselProvider
                visibleSlides={1}
                totalSlides={5}
                //step={3}
                naturalSlideWidth={238}
                naturalSlideHeight={475}
                hasMasterSpinner
                isPlaying={true}
                infinite={true}
                dragEnabled={false}
                touchEnabled={false}
                interval={2000}
        >
        <Slider>
          <Slide index={0}><Image src={img1} /></Slide>
          <Slide index={1}><Image src={img2} /></Slide>
          <Slide index={2}><Image src={img3} /></Slide>
          <Slide index={3}><Image src={img4} /></Slide>
          <Slide index={4}><Image src={img5} /></Slide>

          
        </Slider>
        
      </CarouselProvider>



          </div>

        </div>
         

        <div className='LoginCard'>
          <Card variant = "outlined">
              <div className='insta-logo'>
                  <img src = {insta} alt=""/>

              </div>
      
        
        <CardContent>
        

        {error!=='' && <Alert severity="error">{error}</Alert>}




          <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}  />
          <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <Typography className={classes.text2} color="primary" variant="subtitle2" >
           Forget Password? 
          </Typography>
         
        </CardContent>
     
      <CardActions>
        <Button color="primary"  fullWidth={true}  variant="contained"  onClick={handleClick}  disabled = {loading}>
         Log In
        </Button>
      </CardActions>
      

      </Card>

      <Card variant="outlined" className ={classes.card2} >
      <CardContent>
          <Typography className = {classes.text1} variant="subtitle2" >
           Don't have an account? <Link to="/SignUp" style={{textDecoration : "none"}} >Sign Up</Link>
          </Typography>
        </CardContent>

      </Card>


    </div>


      </div>

    
    
    
  );
}
