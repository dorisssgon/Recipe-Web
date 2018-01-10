import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Route, NavLink } from 'react-router-dom';
import Home from './Home' ;
import Submit from './Submit';
import Ingredients from './Ingredients';

const history = createBrowserHistory();
ReactDOM.render(
  <Router history={history} >
  <div className="container">
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <NavLink to = "/" className="navbar-brand" >Love To Eat</NavLink>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li ><NavLink exact activeClassName = "activeNav" to ="/" >Home</NavLink></li>
          <li><NavLink activeClassName = "activeNav" to="/submit">Submit a Recipe</NavLink></li>
        </ul>
      </div>
    </div>
  </nav>
  <Route exact path ="/" component = {Home} />
  <Route path = "/submit" component = {Submit} />
  </div>
  </Router>,
  document.getElementById('root')
);
