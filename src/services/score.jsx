import { db } from "../firebase";
import React, { Component } from "react";
import { ref, onValue, update } from "firebase/database";

import { fmt } from "../utils/formatter";
import ScoreBox from "../components/scoreBox";
import ScoreCard from "../components/scoreCard";
import WaitingModule from "../components/waitingModule";
import Graph from "../components/graph";
import { scoreService } from "./scoreService";

class Score extends Component {
  constructor(props) {
    super();
    this.state = {
      scores: null,
    };
    this.courseName = "ninigret";
  }

  componentDidMount() {
    scoreService.getData().then((data) => {
      const scores = data;
      this.translateToScoreBox(scores);
    });
  }

  translateToScoreBox(data) {
    const scores = data;
    const scoreBoxData = [];

    scores.forEach((score) => {
      scoreBoxData.push({
        hole: score.hole,
        strokes: score.strokes,
        par: score.par,
      });
    });
    this.setState({ scores: scoreBoxData });
  }

  render() {
    const { scores } = this.state;

    return (
      <div>
        {scores ? (
          scores.map((element, index) => (
            <ScoreBox
              score={element}
              key={index}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
            />
          ))
        ) : (
          <WaitingModule />
        )}
        <button onClick={() => this.handleSubmit()}>Submit</button>
      </div>
    );
  }

  handleSubmit = () => {
    const updates = {};
    let temp = fmt.transformScores(this.state.scores);

    updates[`users/bcostanzo/courses/${this.courseName}/0`] = temp;
    update(ref(db), updates);
  };

  /**
   *  1) clone array
   *  2) update value
   *  3) update state
   * @param {*} score
   */
  handleIncrement = (score) => {
    const scores = [...this.state.scores];
    const index = scores.indexOf(score);
    scores[index] = { ...score }; // copies the object in the array
    scores[index].strokes++;
    this.setState({ scores });
  };

  handleDecrement = (score) => {
    const scores = [...this.state.scores];
    const index = scores.indexOf(score);
    scores[index] = { ...score };
    scores[index].strokes =
      scores[index].strokes <= 1 ? 1 : scores[index].strokes - 1;
    this.setState({ scores });
  };
}

export default Score;
