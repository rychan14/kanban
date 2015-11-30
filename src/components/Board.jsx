import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Issue from './Issue';
import Lane from './Lane';

export default class Board extends Component {
  render() {
    return (
      <div style={styles.base}>
        <Lane issues={this.props.issues} />
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
