import React from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import MainApp from './main';
import Reserve from './reserve';
import Inquire from './Inquire';
import Suggest from './Suggest';
import Search from './Search';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/reserve" component={Reserve} />
          <Route exact path="/Search" component={Search} />
          <Route exact path="/Suggest" component={Suggest} />
          <Route exact path="/Inquire" component={Inquire} />
          <Route path="/" component={MainApp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;