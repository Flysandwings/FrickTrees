import { Component } from "react";

class Formatter extends Component {
  transformScores = (obj) => {
    let scoreList = [];

    for (let i = 0; i < obj.length; i++) {
      scoreList[i] = obj[i].strokes;
    }
    return scoreList;
  };
}

export const fmt = new Formatter();
