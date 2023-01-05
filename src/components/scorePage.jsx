import React, { Component } from "react";
import ScoreBox from "./scoreBox";
import WaitingModule from "./waitingModule";
import { db } from "../firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";

class ScorePage extends Component {
  db = getDatabase();

  getName = () => {
    let data;
    const name = ref(db, "users/acostanzo/name");
    onValue(name, (snapshot) => {
      data = snapshot.val();
      this.setState({ name: data });
    });
  };

  // todo get the name of the course too
  getCourseName = () => {
    let data;
    const course = ref(db, "users/acostanzo/scores");
    onValue(course, (snapshot) => {
      data = snapshot.val();
      data = Object.keys(data)[0];
      this.setState({ course: data });
    });
  };

  handleSubmit = () => {
    let temp = this.transformScores(this.state.scores);
    set(ref(db, "users/acostanzo/scores"), {
      ninigret: temp,
    });
  };

  transformScores = (obj) => {
    let scoreList = {
      scores: [],
    };

    for (let i = 0; i < obj.length; i++) {
      scoreList.scores[i] = obj[i].strokes;
    }
    return scoreList;
  };

  constructor() {
    super();
    this.state = {
      name: "None",
      course: "Empty",
      scores: [],
    };
    this.getName();
    this.getCourseName();
  }

  componentDidMount() {
    let data;
    const db_scores = ref(db, "users/acostanzo/scores/ninigret");
    onValue(db_scores, (snapshot) => {
      data = snapshot.val();
      let newScores = [];
      for (let i = 0; i < data.scores.length; i++) {
        let obj = {
          hole: i + 1,
          strokes: data.scores[i],
        };
        newScores.push(obj);
      }
      if (newScores.length > 0) {
        this.setState({ scores: newScores });
      } else {
        console.log("no elements");
      }
    });
  }

  /**
   *  1) clone array
   *  2) update value
   *  3) update state
   * @param {*} score
   */
  handleIncrement = (score) => {
    const scores = [...this.state.scores];
    const index = scores.indexOf(score);
    scores[index] = { ...score };
    scores[index].strokes++;
    this.setState({ scores });
  };

  handleDecrement = (score) => {
    const scores = [...this.state.scores];
    const index = scores.indexOf(score);
    scores[index] = { ...score };
    let x = scores[index].strokes <= 1 ? 1 : scores[index].strokes--;
    this.setState({ scores });
  };

  render() {
    const { name, scores, course } = this.state;

    if (scores.length === 0) {
      return <WaitingModule />;
    }

    return (
      <div>
        <h1>Name: {name}</h1>
        <h2>Course: {course}</h2>
        {scores
          ? scores.map((element, index) => (
              <ScoreBox
                score={element}
                key={index}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
              />
            ))
          : null}
        <button onClick={() => this.handleSubmit()}>Submit</button>
      </div>
    );
  }
}

export default ScorePage;
