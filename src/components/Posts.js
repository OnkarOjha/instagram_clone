import React, { useState, useEffect } from 'react';
import { database } from "../Firebase";
import CircularProgress from '@mui/material/CircularProgress';
import Video from "./Video"
import Avatar from '@mui/material/Avatar';
import './Post.css';
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';

import Like2 from './Like2'
import AddComment from './AddComment';
import Comments from './Comments';


function Posts({ userData }) {
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = useState(null);


    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };




    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr = []
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data)

            })
            setPosts(parr)
        })
        return unsub
    }, [])

    //for Intersection Observer api

    const callback = (entries) =>{
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[0]
            console.log(ele);
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause();
                }
            })
        })
    }


    let observer = new IntersectionObserver(callback, {threshold:0.6});
    useEffect(()=>{
        const elements = document.querySelectorAll(".videos")
        elements.forEach((element)=>{
            observer.observe(element)
        })
        return ()=>{
            observer.disconnect();
        }
    },[posts])

    return (
        <div>
            {
                posts === null || userData === null ? <CircularProgress /> :
                    <div className="video-container" >
                        {
                            posts.map((post, index) => (
                                <React.Fragment key={index}>

                                    <div className="videos">
                                        <Video src={post.pUrl} />
                                        <div className="fa" style={{ display: 'flex' }}>
                                            <Avatar src={userData.profileUrl} />
                                            <h4>{userData.fullname}</h4>


                                        </div>
                                        <Like userData={userData} postData={post} />
                                        <ChatBubbleIcon className="Chat-styling" onClick={() => handleClickOpen(post.pid)} />
                                        <Dialog
                                            open={open === post.pid}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullScreen={true}
                                            maxWidth='md'
                                        >
                                            <div className="modal-container">
                                                <div className="video-modal">
                                                    <video autoPlay={true} muted="muted" controls>
                                                        <source  src={post.pUrl}/>
                                                        
                                                    </video>


                                                </div>
                                                <div className="comment-modal">
                                                    <Card className="Card1" style={{padding:'1rem'}}>
                                                        
                                                        <Comments postData={post} />
                                                    </Card>
                                                    <Card variant="outlined" className="Card2" >
                                                        <Typography style={{padding:'0.4rem'}} >{post.likes.length==0?'':`Liked by ${post.likes.length} users`} </Typography>
                                                        <div style={{display:'flex'}}>
                                                            
                                                            <Like2 postData={post} userData={userData} style={{display:'flex',alignItems:'center',justifyConten:'center'}} />
                                                            <AddComment postData={post} userData={userData} style={{display:'flex',alignItems:'center',justifyConten:'center'}} />
                                                            
                                                        </div>
                                                    </Card>


                                                </div>

                                            </div>


                                        </Dialog>

                                    </div>

                                </React.Fragment>
                            ))
                        }


                    </div>
            }


        </div>
    )

}

export default Posts;