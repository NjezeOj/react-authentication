import React, { useEffect } from 'react';
import './index.css';
import store from './store';
import { Provider } from 'react-redux'
import Login from './Login'
import Dashboard from './Dashboard'
import Register from './Register'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { setToken } from './setToken'
import { loadUser } from './action/auth'

if (localStorage.getItem('token')) {
  setToken(localStorage.getItem('token'));
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  

  return(
    <Provider store = {store}>
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App


