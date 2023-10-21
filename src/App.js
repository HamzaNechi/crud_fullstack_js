import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import Categorie from './components/Categorie';
import Produit from './components/Produit';



function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Routes>
          <Route path='/' element={<Categorie />}/>
          <Route path='/produit' element={<Produit />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
