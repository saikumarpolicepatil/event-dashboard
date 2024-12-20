import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import EventManagement from './components/EventManagement';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if a token exists in localStorage and set authentication status
    if (localStorage.getItem('token')) {
      isAuthenticated = true;
    }
  }, [isAuthenticated]);

  return (
    <Switch>
      <Route path="/login" render={() => isAuthenticated ? <Redirect to="/dashboard" /> : <Login />} />
      <PrivateRoute path="/dashboard" component={EventManagement} />
      <PrivateRoute path="/" exact component={EventManagement} />
    </Switch>
  );
}

export default App;
