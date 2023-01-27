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

import { scoreService } from "../services/scoreService";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: null,
    };
  }

  translateToGraph(data) {
    const scores = data;
    const graphData = [];

    scores.forEach((score) => {
      graphData.push({
        name: `hole${score.hole}`,
        uv: score.strokes,
        pv: score.par,
      });
    });
    this.setState({ graphData });
  }

  componentDidMount() {
    scoreService.getData().then((data) => {
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
          <h1>Null</h1>
        )}
      </div>
    );
  }
}

export default Graph;
