import React, { Component } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "../firebase";

class ScoreService extends Component {
  constructor(props) {
    super(props);

    this.data = {};

    this.courseName = "ninigret";
    // const par = this.getPar();
    // console.log(par);
    // this.getScore();
    // this.handleData(this.data.par, this.data.score);
  }

  // {url}/courses/{course_name}/par
  getPar = () => {
    return new Promise((resolve, reject) => {
      let data;
      const par = [];
      const _par = ref(db, `courses/${this.courseName}/par`);
      onValue(_par, (snapshot) => {
        data = snapshot.val();
        for (let i = 0; i < data.length; i++) {
          par.length !== data.length && par.push(data[i]);
        }
        this.data.par = par;
        resolve(snapshot.val());
        reject("Error");
      });
    });
  };

  // {url}/users/{user_name}/{course_name}/{game_number}
  getScore = () => {
    return new Promise((resolve, reject) => {
      let data;
      const score = [];
      const _score = ref(db, `users/bcostanzo/courses/${this.courseName}/0`);
      onValue(_score, (snapshot) => {
        data = snapshot.val();
        for (let i = 0; i < data.length; i++) {
          score.length !== data.length && score.push(data[i]);
        }
        this.data.score = score;
        resolve(snapshot.val());

        reject("Error");
      });
    });
  };

  getData = async () => {
    try {
      const par = await this.getPar();
      const score = await this.getScore();
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
