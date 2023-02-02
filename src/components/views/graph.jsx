import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
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
    this.holeCount = null;
  }

  translateToGraph(data) {
    const scores = data;
    const graphData = [];
    if (scores) {
      this.holeCount = scores.length;
      scores.forEach((score) => {
        graphData.push({
          hole: score.hole,
          strokes: score.strokes,
          par: score.par,
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
          <ResponsiveContainer width="90%" height={200}>
            <LineChart
              data={this.state.graphData}
              margin={{
                top: 20,
                right: 0,
                left: -20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hole" domain={[1, this.holeCount]} interval={2}>
                <Label value="Hole number" position="bottom" />
              </XAxis>
              <YAxis domain={[1, 9]} interval={0}>
                <Label value="Strokes" angle={-90} position="left" />
              </YAxis>
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length > 0) {
                    return (
                      <div
                        style={{
                          backgroundColor: "white",
                          padding: "10px",
                          border: "1px solid rgb(204,204,204)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <p style={{ margin: "0px", textAlign: "right" }}>
                          Hole: {payload[0].payload.hole}
                        </p>
                        <ul
                          style={{
                            padding: "0px",
                            margin: "0px",
                            textAlign: "right",
                          }}
                        >
                          <li
                            style={{
                              display: "block",
                              paddingTop: "4px",
                              paddingBottom: "4px",
                              color: "rgb(136,132,216)",
                            }}
                          >
                            Strokes: {payload[0].payload.strokes}
                          </li>
                          <li
                            style={{
                              display: "block",
                              paddingTop: "4px",
                              paddingBottom: "4px",
                              color: "rgb(130,202,157)",
                            }}
                          >
                            Par: {payload[0].payload.par}
                          </li>
                        </ul>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {/* <Legend
                layout="bottom"
                align="right"
                verticalAlign="top"
                wrapperStyle={{ padding: 20 }}
              /> */}
              <Line type="monotone" dataKey="par" stroke="#8884d8" />
              <Line type="monotone" dataKey="strokes" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <h1>You do not have any data for this round.</h1>
        )}
      </div>
    );
  }
}

export default Graph;
