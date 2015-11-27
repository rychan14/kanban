import React, {Component} from 'react';
import Issue from './Issue';

export default class Board extends Component {
  render() {
    return (
      <div>
        Board Component:
        {this.props.issues.map(issue => {
          return(
            <Issue key={Object.keys(issue)[0]} issue={issue} />
          );
        })}
      </div>
    );
  }
}
