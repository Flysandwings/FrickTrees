import React, { Component } from "react";

class ScoreBox extends Component {
  state = {
    hole: this.props.score.hole,
    strokes: this.props.score.strokes,
  };

  handleIncrement = () => {
    this.setState({ strokes: this.state.strokes + 1 });
  };

  handleDecrement = () => {
    this.state.strokes <= 0
      ? this.setState({ strokes: 0 })
      : this.setState({ strokes: this.state.strokes - 1 });
  };

  render() {
    const { hole, strokes } = this.state;

    return (
      <div>
        <h1>Hole: {hole}</h1>
        <h2>Strokes: {strokes}</h2>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
        <button onClick={() => this.props.onSubmit(hole, strokes)}>
          Submit
        </button>
      </div>
    );
  }
}

export default ScoreBox;
