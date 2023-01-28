import { Component } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

class ScoreService extends Component {
  constructor(props) {
    super(props);
    this.data = {};
  }

  // {url}/courses/{course_name}/par
  getPar = (course) => {
    return new Promise((resolve, reject) => {
      let data;
      const par = [];
      const _par = ref(db, `courses/${course}/par`);
      onValue(_par, (snapshot) => {
        data = snapshot.val();
        if (data) {
          for (let i = 0; i < data.length; i++) {
            par.length !== data.length && par.push(data[i]);
          }
          this.data.par = par;
          resolve(snapshot.val());
        }

        reject(`Error: Could not resolve course name: ${course}`);
      });
    });
  };

  // {url}/users/{user_name}/{course_name}/{game_number}
  getScore = (round, course) => {
    return new Promise((resolve, reject) => {
      let data;
      const score = [];
      const _score = ref(db, `users/bcostanzo/courses/${course}/${round}`);
      onValue(_score, (snapshot) => {
        data = snapshot.val();
        if (data) {
          for (let i = 0; i < data.length; i++) {
            score.length !== data.length && score.push(data[i]);
          }
          this.data.score = score;
          resolve(snapshot.val());
        }

        reject(`Error: Could not resolve round data for round: ${round}`);
      });
    });
  };

  getData = async (round, course) => {
    try {
      const par = await this.getPar(course);
      const score = await this.getScore(round, course);
      const total = [];
      for (let i = 0; i < par.length; i++) {
        let obj = { hole: i + 1, strokes: score[i], par: par[i] };
        total.push(obj);
      }
      return total;
    } catch (error) {
      console.log(error);
    }
  };
}

export const scoreService = new ScoreService();
