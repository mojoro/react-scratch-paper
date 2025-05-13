import { Component } from "react";

class Count extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.count = this.props.todos.length;
    return <span>{this.count}</span>;
  }
}

export default Count;
