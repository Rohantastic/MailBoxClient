import './App.css';
import SignUpPage from "../src/components/pages/Signup";
import LoginPage from './components/pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MailBox from "../src/components/pages/MailBox";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<SignUpPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/home' element={<MailBox/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
