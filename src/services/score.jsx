import { db } from "../firebase";
import React, { Component } from "react";
import { ref, onValue, update } from "firebase/database";

import { fmt } from "../utils/formatter";
import ScoreBox from "../components/scoreBox";
import ScoreCard from "../components/scoreCard";
import WaitingModule from "../components/waitingModule";

class Score extends Component {
  constructor(props) {
    super();
    this.state = {
      scores: [],
      shouldUpdate: false,
    };
    this.basePath = `${props.basePath}/courses/${props.course}/${props.round}`;
    this.parPath = `${props.basePath}/courses/${props.course}/par`;
  }

  componentDidMount() {
    this.load();
  }

  render() {
    const { scores } = this.state;

    return (
      <div>
        {scores.length !== 0 ? (
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
        {scores.length !== 0 ? (
          <ScoreCard scores={scores} shouldUpdate={this.state.shouldUpdate} />
        ) : (
          <h1>Score card not available...</h1>
        )}
      </div>
    );
  }

  load = () => {
    let data;
    const pars = [];
    const par = ref(db, `${this.parPath}`);
    onValue(par, (snapshot) => {
      data = snapshot.val();
      for (let i = 0; i < data.length; i++) {
        pars.length !== data.length && pars.push(data[i]);
      }
      this.displayScore(pars);
    });
  };

  displayScore = (parList) => {
    let data;
    const scores = [...this.state.scores];
    const game = ref(db, `${this.basePath}`);
    onValue(game, (snapshot) => {
      data = snapshot.val();
      for (let i = 0; i < data.length; i++) {
        let obj = { hole: i + 1, strokes: data[i], par: parList[i] };

        if (scores.length !== data.length) {
          scores.push(obj);
        }

        const target = scores.find((e) => {
          return e.hole === i + 1;
        }); // find the obj with the same hole as i

        scores[i] = { ...target };
        scores[i].strokes = data[i];
      }
      this.setState({ scores });
    });
  };

  handleSubmit = () => {
    const updates = {};
    let temp = fmt.transformScores(this.state.scores);

    updates[`${this.basePath}`] = temp;
    update(ref(db), updates);
    this.setState({ shouldUpdate: !this.state.shouldUpdate });
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
