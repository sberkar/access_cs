import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Random from './components/pages/Random'
import Navbar from './components/partials/Navbar';
import Categories from './components/pages/Categories'
import API from './components/pages/API';
import Login from './components/pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/random' element={<Random />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/api/:id' element={<API />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
