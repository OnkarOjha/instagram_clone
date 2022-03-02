import React from 'react';
import './Video.css'
import  ReactDOM  from 'react';
import './Like'

function Video(props){
    const handleClick=(e)=>{
        e.preventDefault();
        e.target.muted = !e.target.muted
    }
    const handleScroll=(e)=>{
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
        if(next){
            next.scrollintoView()

            e.target.muted = true;
        }

    }


    return(
        <video src={props.src} onEnded={handleScroll} className="videos-styling" muted="muted" onClick={handleClick} >

        </video>
    )
}
export default Video;