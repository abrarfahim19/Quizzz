import CreateQuiz from './components/CreateQuiz.jsx';
import SingleQuiz from './components/SingleQuiz.jsx';
import app from './lib/firebase.init.js';
import Home from './pages/Home';
import Footer from './shared/Footer';
import NavBar from './shared/NavBar';

function App() {
  console.log(process.env.REACT_APP_apiKey);
  
  return (
    <div>
      <NavBar />
      {/* <Home/> */}
      <CreateQuiz/>
      {/* <SingleQuiz/> */}
      <Footer/>
    </div>
  );
}

export default App;
