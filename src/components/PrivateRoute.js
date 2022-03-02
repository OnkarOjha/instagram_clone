import React , {useContext} from 'react';
import { Authcontext } from '../context/AuthContext';
import {Route , Navigate ,Routes ,Outlet  } from "react-router-dom";

function PrivateRoute({element:Element,...rest}){
    const {user}= useContext(Authcontext);
    
    return(
        <Routes>
        
        <Route {...rest} render={props=>{
            return user?<Element {...props}/> : <Navigate to="/login" />


        }} />
        </Routes>
        
    )
}
export default PrivateRoute;