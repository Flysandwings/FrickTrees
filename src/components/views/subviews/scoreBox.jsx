import React, { Component } from "react";

class ScoreBox extends Component {
  render() {
    const { score } = this.props;
    const { hole, strokes, par } = this.props.score;

    return (
      <div>
        <h1>Hole: {hole}</h1>
        <h2>Strokes: {strokes}</h2>
        <h2>Par: {par}</h2>
        <button onClick={() => this.props.onIncrement(score)}>+</button>
        <button onClick={() => this.props.onDecrement(score)}>-</button>
      </div>
    );
  }
}

export default ScoreBox;
