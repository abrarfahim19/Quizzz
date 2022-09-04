import SingleQuiz from './components/SingleQuiz.jsx';
import Option from './components/Option';
import Home from './pages/Home';
import Footer from './shared/Footer';
import NavBar from './shared/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      {/* <Home/> */}
      <SingleQuiz/>
      {/* <Option selectType={"multi"}/> */}
      <Footer/>
    </div>
  );
}

export default App;
