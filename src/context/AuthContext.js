import React,{useState , useEffect} from "react";
import {auth} from '../Firebase';
export const Authcontext  = React.createContext();


export function AuthProvider({children}){

    const[user,setUser] = useState();
    const[loading,setLoading] = useState(true);

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email , password);
    }
    function login(email,password)
    {
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout(){
        return auth.signOut()
    }
//making states and state changing functionS
    useEffect(()=>{
        const unsub = auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
        })
        return ()=>{
            unsub();
        }

    },[])

    const store = {
        user,
        signup,
        login,
        logout
    }

    return(
        <Authcontext.Provider value={store}>
            {!loading && children}
        </Authcontext.Provider>
    )



}
