import logo from "./logo.svg";
import React, { Component } from "react";

import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = { manager: "" };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    this.setState({ manager });
  }
  render() {
    return (
      <div className="App">
        <h2> Lottery contract manager {this.state.manager}</h2>
      </div>
    );
  }
}

export default App;
