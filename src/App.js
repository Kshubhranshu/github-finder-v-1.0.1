import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  // search github users
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
    setUsers(res.data.items);
    setLoading(false);
  }

  // get single github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    setUser(res.data);
    setLoading(false);
  }

  //get user repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`);
    setRepos(res.data);
    setLoading(false);
  }

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const showAlert = (message, type) => {
    setAlert(({ message, type }));
    setTimeout(() => { setAlert(null) }, 5000);
  }

  return (
    <Router>
      <div className="App" >
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + '/'} render={props => (
              <Fragment>
                <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length > 0 ? true : false} setAlert={showAlert} />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path={process.env.PUBLIC_URL + '/about'} component={About} />
            <Route exact path={process.env.PUBLIC_URL + '/user/:login'} render={props => (
              <User {...props} getUser={getUser} getUserRepos={getUserRepos} repos={repos} user={user} loading={loading} />
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default App;
