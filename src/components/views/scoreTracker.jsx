import { db } from "../../firebase";
import React, { Component } from "react";
import { ref, update } from "firebase/database";

import { fmt } from "../../utils/formatter";
import { scoreService } from "../../services/scoreService";

import ScoreBox from "./subviews/scoreBox";
import WaitingModule from "../waitingModule";

class ScoreTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: null,
    };
    this.round = this.props.info.round;
    this.course = this.props.info.course;
  }

  componentDidMount() {
    scoreService.getData(this.round, this.course).then((data) => {
      const scores = data;
      this.translateToScoreBox(scores);
    });
  }

  translateToScoreBox(data) {
    const scores = data;
    const scoreBoxData = [];
    if (scores) {
      scores.forEach((score) => {
        scoreBoxData.push({
          hole: score.hole,
          strokes: score.strokes,
          par: score.par,
        });
      });
      this.setState({ scores: scoreBoxData });
    }
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
        {scores ? (
          <button onClick={() => this.handleSubmit()}>Submit</button>
        ) : null}
      </div>
    );
  }

  handleSubmit = () => {
    const updates = {};
    let temp = fmt.transformScores(this.state.scores);

    updates[`users/bcostanzo/courses/${this.courseName}/0`] = temp;
    update(ref(db), updates);
  };

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

export default ScoreTracker;
