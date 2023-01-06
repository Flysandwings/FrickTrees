import React, { Component } from "react";
import ScoreBox from "./scoreBox";
import WaitingModule from "./waitingModule";
import { db } from "../firebase";
import { getDatabase, ref, onValue, set, update } from "firebase/database";

class ScorePage extends Component {
  /**
   *  this.state: {
   *    name : AndrewB
   *    course : ninigret
   *    scores : [
   *      { hole: 1, strokes: 3 },
   *      { hole: 2, strokes: 4 },
   *      { hole: 3, strokes: 5 }
   *    ]
   *
   *    0 : { 0:3 , 1:4, 2:5 }
   *    1 : { 0:6, 1:7, 2: 8 }
   *
   * }
   */

  db = getDatabase();

  getName = () => {
    let data;
    const name = ref(db, "users/bcostanzo/name");
    onValue(name, (snapshot) => {
      data = snapshot.val();
      this.setState({ name: data });
    });
  };

  // todo get the name of the course too
  getCourseName = () => {
    let data;
    const course = ref(db, "users/bcostanzo/courses");
    onValue(course, (snapshot) => {
      data = snapshot.val();
      data = Object.keys(data)[0];
      this.setState({ course: data });
    });
  };

  handleSubmit = () => {
    const gameNumber = 0;
    const updates = {};
    let temp = this.transformScores(this.state.scores, gameNumber);

    updates[`users/bcostanzo/courses/ninigret/${gameNumber}`] = temp;
    update(ref(db), updates);
  };

  transformScores = (obj) => {
    let scoreList = [];

    for (let i = 0; i < obj.length; i++) {
      scoreList[i] = obj[i].strokes;
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
  }

  componentDidMount() {
    this.getName();
    this.getCourseName();

    let data;
    const scores = [...this.state.scores];
    const game = ref(db, "users/bcostanzo/courses/ninigret/0");
    onValue(game, (snapshot) => {
      data = snapshot.val();
      for (let i = 0; i < data.length; i++) {
        let obj = { hole: i + 1, strokes: data[i] };

        if (scores.length != data.length) {
          scores.push(obj);
        }

        const target = scores.find((e) => {
          return e.hole == i + 1;
        }); // find the obj with the same hole as i

        scores[i] = { ...target };
        scores[i].strokes = data[i];
      }
      this.setState({ scores });
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
    scores[index] = { ...score }; // copies the object in the array
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
