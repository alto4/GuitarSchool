import { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Lessons from './components/lessons/Lessons';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/lessons' element={<Lessons />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />s
        </Routes>
        <Footer />
      </Fragment>
    </Router>
  );
}

export default App;