import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./sites/Home";
import Coins from "./sites/Coins";
import Gas from "./sites/Gas";
import Farm from "./sites/Farm";

import Nav from "./components/Nav";

import CoinDetail from "./components/CoinDetail";

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/coins" component={Coins} />
        <Route exact path="/farm" component={Farm} />
        <Route exact path="/gas" component={Gas} />
        <Route exact path="/" component={Home} />
        <Route exact path="/coin/:id" component={CoinDetail} />
      </Switch>
    </div>
  );
}

export default App;
