import React from 'react';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Status/Dashboard';
import PrivateRoute from './privateRoutes';
import Betahome from './pages/Home/Betahome';

// Rotas
const routes = () => {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Betahome/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path="/login/sso-callback" element={<AuthenticateWithRedirectCallback />} />

      { /* PRIVATE ROUTES */}
      <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
    </Routes>
  </Router>
  )
}

export default routes
