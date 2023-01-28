import React, { Component } from "react";

import { scoreService } from "../../services/scoreService";

class ScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: null,
    };
    this.round = this.props.info.round;
    this.course = this.props.info.course;
  }

  translateToTable = (data) => {
    const scores = data;
    const tableData = [["Hole", "Strokes", "Par"]];
    if (scores) {
      scores.forEach((score) => {
        tableData.push([score.hole, score.strokes, score.par]);
      });
      this.setState({ tableData });
    }
  };

  componentDidMount() {
    scoreService.getData(this.round, this.course).then((data) => {
      this.translateToTable(data);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.shouldUpdate !== this.props.shouldUpdate) {
      this.translateToTable(this.props);
    }
  }

  render() {
    const { tableData } = this.state;
    return (
      <div>
        {tableData ? (
          <table>
            <thead>
              <tr>
                {this.state.tableData[0].map((header, i) => (
                  <th key={i}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.tableData.slice(1).map((row, i) => (
                <tr key={i}>
                  {row.map((col, j) => (
                    <td key={j}>{col}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>You do not have any table data for this round.</h1>
        )}
      </div>
    );
  }
}

export default ScoreCard;
