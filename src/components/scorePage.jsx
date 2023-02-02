import React, { Component } from "react";

//import PlayerInformation from "../services/playerInformation";
//import CourseInformation from "../services/courseInformation";
//import ScoreTracker from "./views/scoreTracker";
//import ScoreService from "../services/scoreService";
import Graph from "./views/graph";
//import ScoreCard from "./views/scoreCard";

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
   * 
   * 
   * <div>
        <PlayerInformation basePath={ScorePage.basePath} />
        <CourseInformation basePath={ScorePage.basePath} />
        <Score
          basePath={ScorePage.basePath}
          course={ScorePage.course}
          round={ScorePage.round}
        />
      </div>
      {/*<Graph />;}<ScoreCard />
      return <ScoreTracker info={ScorePage.infoObject} />;
      return <Graph info={ScorePage.infoObject} />;
   */

  static basePath = "users/bcostanzo";
  static infoObject = {
    course: "ninigret",
    round: 1,
  };

  render() {
    return <Graph info={ScorePage.infoObject} />;
  }
}

export default ScorePage;
