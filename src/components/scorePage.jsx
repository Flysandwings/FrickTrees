import React, { Component } from "react";

import PlayerInformation from "../services/playerInformation";
import CourseInformation from "../services/courseInformation";
import Score from "../services/score";

class ScorePage extends Component {
  /**
   *  this.state: {
   *    name : AndrewB
   *    course : ninigret
   *    scores : [
   *      { hole: 1, strokes: 3, par: 7 },
   *      { hole: 2, strokes: 4, par: 8  },
   *      { hole: 3, strokes: 5, par: 9 }
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
        <Score
          basePath={ScorePage.basePath}
          course={ScorePage.course}
          round={ScorePage.round}
        />
      </div>
    );
  }
}

export default ScorePage;
