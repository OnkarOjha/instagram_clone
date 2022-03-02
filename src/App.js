import logo from './logo.svg';
import './App.css';
import SignUp from './components/signup';
import {BrowserRouter , Switch , Route ,Routes} from "react-router-dom";
import LogIn from './components/Login';
import {AuthProvider} from './context/AuthContext'
import Feed from './components/feed';
import PrivateRoute from './components/PrivateRoute';
import Profile from "./components/Profile";
import Ioa from './components/ioa';


function App() {
  return (


    //error handling:- In V6, you can't use the component prop anymore. It was replaced in favor of element:
    <div >
      <BrowserRouter>
        <AuthProvider>
          
          <Routes>
            <Route  exact path = "/login" element={<LogIn />} />
            <Route  exact path = "/signup" element={<SignUp />} />
            <Route  exact path = "/profile/:id" element={<Profile />} />

            <Route  exact path = "/" element={<Feed />} />


           
              {/*<Route exact  path ="/*" element={<PrivateRoute element={<Feed />} />}/>*/}
              
            
           
          </Routes>
          
        </AuthProvider>
      
                {/*<LogIn />*/}
                {/*<SignUp />*/}
      
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
