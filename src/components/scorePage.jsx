import React, { Component } from "react";
import ScoreBox from "./scoreBox";
import WaitingModule from "./waitingModule";
import { db } from "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";

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

  handleSubmit = (hole, strokeCount) => {
    console.log("Submit to DB called");
    console.log(hole + " " + strokeCount);
  };

  constructor() {
    super();
    this.state = {
      name: "None",
      scores: [],
    };
  }

  componentDidMount() {
    this.getName();
    let data;
    let newScores = [];
    const db_scores = ref(db, "users/acostanzo/scores/ninigret");
    onValue(db_scores, (snapshot) => {
      data = snapshot.val();
      for (let i = 1; i < data.scores.length; i++) {
        let obj = {
          hole: i,
          strokes: data.scores[i],
        };
        newScores.push(obj);
        this.setState({ scores: newScores });
      }
    });
  }

  render() {
    const { name, scores } = this.state;

    if (scores.length === 0) {
      return <WaitingModule />;
    }

    return (
      <div>
        {scores
          ? scores.map((element, index) => (
              <ScoreBox
                score={element}
                key={index}
                onSubmit={this.handleSubmit}
              />
            ))
          : null}
        <h1>Name: {name}</h1>
      </div>
    );
  }
}

export default ScorePage;
