import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { database } from "../Firebase";
import { CircularProgress } from '@mui/material';
import NavBar from './Navbar';
import Typography from '@mui/material/Typography';

///ye page show nh ho rha because id ki value null passs ho rhi h 
function Profile(){
    const {id} = useParams(); // yaha s jo id a rhi hai y koi value return nhi kr rhai h

    const [userData, setUserData] = useState(null);
    const[posts , setPosts] = useState(null);
    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setUserData(snap.data())
        })
    },[id])

    useEffect(async()=>{
        if(userData!=null){
            let parr = []
        for(let i=0;i<userData.postIds.length;i++){
            let postData = await database.users.doc(userData.postIds[i]).get()
            parr.push(postData.data())

        }
        setPosts(parr)
       

        }
        

    })
    return (
      <>
      {
          posts == true || userData==true ? <CircularProgress /> :
          <>
          <NavBar userData = {userData} />
          <div className="spacer"></div>
          <div className="container">
              <div className="upper-part">
                  <div className="profile-img">
                      <img src={userData.profileUrl}></img>
                  </div>
                  <div className='info'>
                      <Typography variant="h2"> 
                        Email : {userData.email}
                      </Typography>
                      <Typography variant="h2"> 
                        Posts : {userData.postIds.length}
                      </Typography>

                  </div>
                </div>
                <hr />
                <div className="profile-videos">

                </div>
          </div>

          </>

      }
      
      </>

    )
}

export default Profile;