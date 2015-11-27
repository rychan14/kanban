import React, {Component} from 'react';
import Radium from 'radium';

export default class Issue extends Component {
  render() {
    const id = Object.keys(this.props.issue)[0];
    const issue = this.props.issue[id];
    return (
      <div style={styles.base}>
        <h3>
          {issue.title}
        </h3>
      </div>
    );
  }
}

const styles = {
  base: {
    borderRadius: 4,
    boxShadow: '2px 2px 2px 2px #D8D8D8',
    width: '300px',
    height: '100px'
  }
};
Issue = Radium(Issue);
