import React, { Component } from "react";
import ScoreBox from "./scoreBox";

class ScorePage extends Component {
  state = {
    strokes: [
      {
        hole: 1,
        strokes: 3,
      },
      {
        hole: 2,
        strokes: 4,
      },
      {
        hole: 3,
        strokes: 5,
      },
    ],
  };

  handleSubmit = (hole, strokeCount) => {
    console.log("Submit to DB called");
    console.log(hole + " " + strokeCount);
  };

  render() {
    return (
      <div>
        {this.state.strokes.map((element, index) => (
          <ScoreBox score={element} key={index} onSubmit={this.handleSubmit} />
        ))}
      </div>
    );
  }
}

export default ScorePage;
