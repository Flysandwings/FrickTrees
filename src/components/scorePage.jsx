import React, { Component } from "react";

import PlayerInformation from "../services/playerInformation";
import CourseInformation from "../services/courseInformation";
import ScoreCard from "../services/scoreCard";

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

  static basePath = "users/bcostanzo";
  static course = "ninigret";
  static round = 0;

  render() {
    return (
      <div>
        {/*<PlayerInformation basePath={ScorePage.basePath} />*/}
        {/*<CourseInformation basePath={ScorePage.basePath} />*/}
        <ScoreCard
          basePath={ScorePage.basePath}
          course={ScorePage.course}
          round={ScorePage.round}
        />
      </div>
    );
  }
}

export default ScorePage;
