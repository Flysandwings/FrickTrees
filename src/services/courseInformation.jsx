import React, { Component } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

class CourseInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: "",
      rounds: 0,
    };
    this.basePath = props.basePath;
  }

  componentDidMount() {
    this.getCourseInfo();
  }

  render() {
    const { course, rounds } = this.state;

    return (
      <div>
        {course ? <h1>Course: {course}</h1> : <h1>Loading course...</h1>}
        {rounds !== 0 ? (
          <h1>Number of rounds: {rounds}</h1>
        ) : (
          <h1>No rounds played</h1>
        )}
      </div>
    );
  }

  getCourseInfo = () => {
    let data;
    const courseName = ref(db, `${this.basePath}/courses`);
    onValue(courseName, (snapshot) => {
      data = snapshot.val();
      let course = Object.keys(data)[0];
      let rounds = Object.keys(data).length;
      this.setState({ rounds });
      this.setState({ course });
    });
  };
}

export default CourseInformation;
