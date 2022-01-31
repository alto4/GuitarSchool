import { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Lessons from './components/lessons/Lessons';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/dashboard/CreateProfile';
import EditProfile from './components/dashboard/EditProfile';
import PrivateRoute from './components/auth/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/lessons' element={<Lessons />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />s
            {/* TODO: Fix private routes using react-router V6 (changes) */}
            <Route element={<PrivateRoute isLoggedIn={true} auth={{ isAuthenticated: true, loading: false }} />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/create-profile' element={<CreateProfile />} />
              <Route path='/edit-profile' element={<EditProfile />} />
            </Route>
          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
