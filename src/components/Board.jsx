import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Issue from './Issue';

export default class Board extends Component {
  render() {
    return (
      <div style={styles.base}>
        {this.props.issues.map(issue => {
          return(
            <Issue key={Object.keys(issue)[0]} issue={issue} />
          );
        })}
      </div>
    );
  }
}

Board.propTypes = {
  issues: PropTypes.array.isRequired
};

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'row'
  }
};

Board = Radium(Board);
