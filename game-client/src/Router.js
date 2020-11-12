import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Info from "./Components/info";
import game from "./Components/game";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Links from "./Components/Nav";



function App() {
  return (
    <main className="main">
      <Router>
        <Links className="main"/>
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
