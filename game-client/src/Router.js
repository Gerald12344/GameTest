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
const ENDPOINT = "https://ac15142f7144430a8ce2ba850b0eabf9.vfs.cloud9.eu-west-2.amazonaws.com/";
const client = socketIOClient(ENDPOINT);


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
