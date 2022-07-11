import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/home/Home';


function App() {
  return (

    <center>
      <BrowserRouter>
      <Routes>
         {/*  <Route path ='/' exact element={ <LandingPage/> }/> */}
          <Route path = '/' element={ <Home/> }/>
        {/*   <Route path = '/recipe' element={ <CreateRecipe/> }/>
          <Route  path = '/home/:id' exact element= {<RecipeDetails/>} /> */} 
        </Routes>
    </BrowserRouter>
  </center>
  
  );
}

export default App;


