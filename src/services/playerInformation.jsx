import React, { Component } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

class PlayerInformation extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
    };
    this.basePath = props.basePath;
  }

  componentDidMount() {
    this.getName();
  }

  render() {
    const { name } = this.state;

    return <div>{name ? <h1>Name: {name}</h1> : <h1>Loading name...</h1>}</div>;
  }

  getName = () => {
    let name;
    const _name = ref(db, `${this.basePath}/name`);
    onValue(_name, (snapshot) => {
      name = snapshot.val();
      this.setState({ name });
    });
  };
}

export default PlayerInformation;
