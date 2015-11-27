import React, {Component} from 'react';
import Radium from 'radium';

export default class Issue extends Component {
  render() {
    const id = Object.keys(this.props.issue)[0];
    const issue = this.props.issue[id];
    const styles = {
      base: {
        borderRadius: 4,
        boxShadow: '5px 5px 5px 5px #D8D8D8',
        width: '500px',
        height: '250px'
      }
    };
    return (
      <div style={styles.base}>
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

Issue = Radium(Issue);
