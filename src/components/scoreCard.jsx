import React, { Component } from "react";

import { scoreService } from "../services/scoreService";

class ScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: null,
    };
  }

  translateToTable = (data) => {
    const scores = data;
    const tableData = [["Hole", "Strokes", "Par"]];
    scores.forEach((score) => {
      tableData.push([score.hole, score.strokes, score.par]);
    });
    this.setState({ tableData });
  };

  componentDidMount() {
    scoreService.getData().then((data) => {
      this.translateToTable(data);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.shouldUpdate !== this.props.shouldUpdate) {
      this.translateToTable(this.props);
    }
  }

  render() {
    return (
      <div>
        {this.state.tableData && (
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
        )}
      </div>
    );
  }
}

export default ScoreCard;
