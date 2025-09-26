import React from "react";
import "./counter.css"
class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    if (this.state.count > 0) {

      this.setState({ count: this.state.count - 1 });
    } else {
      alert("alredy zero")
    }
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div className="card">
        <h2>Counter App</h2>
        <h1>{this.state.count}</h1>
        <div>
          <button onClick={this.increment} >+</button>
          <button onClick={this.decrement} >-</button>
          <button onClick={this.reset} >Reset</button>
        </div>
      </div>
    );
  }
}

export default Counter;
