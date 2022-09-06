import CreateQuiz from './components/CreateQuiz.jsx';
import SingleQuiz from './components/SingleQuiz.jsx';
import app from './lib/firebase.init.js';
import Home from './pages/Home';
import Footer from './shared/Footer';
import NavBar from './shared/NavBar';
import UploadFile from "./components/UploadFile"
import UploadImageHookAprach from './components/UploadImageHookAproach.jsx';
import Login from './pages/Login.jsx';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register.jsx';

function App() {
  console.log(process.env.REACT_APP_apiKey);
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
