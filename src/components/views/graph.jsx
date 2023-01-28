import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { scoreService } from "../../services/scoreService";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: null,
    };
    this.round = this.props.info.round;
    this.course = this.props.info.course;
  }

  translateToGraph(data) {
    const scores = data;
    const graphData = [];
    if (scores) {
      scores.forEach((score) => {
        graphData.push({
          name: `hole${score.hole}`,
          uv: score.strokes,
          pv: score.par,
        });
      });
      this.setState({ graphData });
    }
  }

  componentDidMount() {
    scoreService.getData(this.round, this.course).then((data) => {
      this.translateToGraph(data);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.shouldUpdate !== this.props.shouldUpdate) {
      this.translateToGraph(this.props);
    }
  }

  render() {
    const { graphData } = this.state;
    return (
      <div>
        {graphData ? (
          <LineChart
            width={500}
            height={300}
            data={this.state.graphData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 2 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        ) : (
          <h1>You do not have any data for this round.</h1>
        )}
      </div>
    );
  }
}

export default Graph;
