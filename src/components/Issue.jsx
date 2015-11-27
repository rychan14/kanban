import React, {Component} from 'react';

export default class Issue extends Component {
  render() {
    const id = Object.keys(this.props.issue)[0];
    const issue = this.props.issue[id];
    return (
      <div>
        <h1>
          Title: {issue.title}
        </h1>
        <p>
          Body: {issue.body}
        </p>
      </div>
    );
  }
}
