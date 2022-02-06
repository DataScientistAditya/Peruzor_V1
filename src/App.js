import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LandingPage from './Components/Landing/Landing';
import SigninPage from './Components/SignIn/Signin';
import SignUpPage from './Components/SignUp/SignUp';
import PretestPage from './Components/PreTest/Pretest';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage></LandingPage>}></Route>
        <Route exact path="/login" element={<SigninPage></SigninPage>}></Route>
        <Route exact path="/create-account" element={<SignUpPage></SignUpPage>}></Route>
        <Route exact path="/pretest/:username" element={<PretestPage></PretestPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
