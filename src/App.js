import logo from './logo.svg';
import './App.css';
import SignUpPage from "../src/components/pages/Signup";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<SignUpPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
