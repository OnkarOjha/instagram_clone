import React,{useContext ,useEffect, useState} from 'react';
import { Authcontext } from '../context/AuthContext';
import  { database } from "../Firebase";
import UploadFile from './UploadFile';
import Posts from './Posts'
import NavBar from './Navbar'
function Feed(){
    const {user,logout} = useContext(Authcontext);
    const [userData, setUserData] = useState('');
    useEffect(()=>{
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
            setUserData(snapshot.data())
        })
        return ()=>{unsub()}
        
    },[user])
    return(
        <>
        <NavBar userData={userData} />
        
        <div style={{display:'flex',justifyContent:'center' , alignItems:'center' , flexDirection:'column'}}>
        {/*<div className='comp' style={{width:'50%'}}>
            <h1>welcome to feed! </h1>
            <button onClick={logout} >Log Out</button>
            
        </div>*/}

        




        <UploadFile user={userData} />
        <Posts userData = {userData} />

        </div>
        </>
    )
}
export default Feed;