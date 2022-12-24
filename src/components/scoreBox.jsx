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
    return (
      <div>
        <h1>Hole: {this.state.hole}</h1>
        <h2>Strokes: {this.state.strokes}</h2>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
        <button
          onClick={() =>
            this.props.onSubmit(this.state.hole, this.state.strokes)
          }
        >
          Submit
        </button>
      </div>
    );
  }
}

export default ScoreBox;
