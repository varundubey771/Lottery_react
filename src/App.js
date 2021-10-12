import logo from "./logo.svg";
import React, { Component } from "react";

import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = { manager: "", players: [], balance: "", value: "", message: "" };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "waiting for transaction success" });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });
    this.setState({ message: "transaction successful" });
  };
  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({ from: accounts[0] });
  };

  render() {
    console.log(this.state.value);
    return (
      <div className="App">
        <h2>
          Contract managed by {this.state.manager}
          {this.state.players.length} members competing for
          {web3.utils.fromWei(this.state.balance)}
        </h2>
        <form onSubmit={this.onSubmit}>
          <h1>try your luck</h1>
          <label>enter the amount u wanna put in lottery </label>
          <input
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
            placeholder="0"
          ></input>
          <button>Enter</button>
        </form>
        <hr></hr>
        <h1>{this.state.message}</h1>
        <button onClick={this.onClick}>Pick Winner</button>
      </div>
    );
  }
}

export default App;
