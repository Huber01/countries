import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/home/Home';
import CountryDetails from './components/CountryDetail/CountryDetail';
import CreateActivity from './components/CreateActivity/CreateActivity';
import LandingPage from './components/landingPage/LandingPage';


function App() {
  return (

    <center>
    <BrowserRouter>
      <Routes>
          <Route path ='/' exact element={ <LandingPage/> }/>
          <Route path = '/home' element={ <Home/> }/>
          <Route path = '/create' element={ <CreateActivity/> }/>
          <Route path = '/:id' element= {<CountryDetails/>} /> 
        </Routes>
    </BrowserRouter>
  </center>
  
  );
}

export default App;


