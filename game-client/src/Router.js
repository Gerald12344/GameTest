import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Info from "./Components/info";
import game from "./Components/game";
import Nav from "./Components/Nav"
import Home from "./Components/Home"

function Links() {
  return (
      <nav class="NavBar">
        <ul>
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Info">Info</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
        </ul>
      </nav>
  );
} 

function App() {
  return (
    <main>
    <game />
        <Router>  
        <Links />
          <Switch>
            <Route path="/:filter?/Info" component={Info} exact />
            <Route path="/:filter?/game" component={game} exact />
            <Route path="/:filter?/" component={Home} exact />
          </Switch>
        </Router>
        </main>
  );
}

export default App;