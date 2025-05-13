import { Component } from "react";

class Count extends Component {
  constructor(props) {
    super(props);

    this.count = this.props.count.length;
  }

  render() {
    return <span>{this.props.count}</span>;
  }
}

export default Count;
