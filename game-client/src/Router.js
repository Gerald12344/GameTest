import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {SocketIOContext} from './IOHandler';

import Info from "./Components/info";
import game from "./Components/game";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Links from "./Components/Nav";

import socketIOClient from "socket.io-client";
const ENDPOINT = "";
const client = socketIOClient('http://127.0.0.1:3000');
localStorage.debug = null
function App() {
  return (
    <main className="main">
    <SocketIOContext.Provider value={client}>
      <Router>
        <Links className="main"/>
        <Switch>
          <Route path="/:filter?/Info" component={Info} exact />
          <Route path="/:filter?/game" component={game} exact />
          <Route path="/:filter?/" component={Home} exact />
        </Switch>
      </Router>
      </SocketIOContext.Provider>
    </main>
  );
}

export default App;
