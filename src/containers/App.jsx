import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';
import {fetchIssues} from '../actions/issues';
import {fetchRepo} from '../actions/repos';
import GetRepo from '../components/GetRepo';
import Board from '../components/Board';

// Babel ES7 decorators not working
// Currently in development for Babel
// Connect export at bottom
// @connect((state) => {
//   return {
//     issues: state.issues,
//     repo: state.repo
//   };
// })

export class App extends Component {
  getIssues() {
    let repoName = Object.keys(this.props.repo)[0];
    this.props.dispatch(fetchIssues(repoName));
  }
  render() {
    const {dispatch} = this.props;
    return (
      <div style={styles}>
        <GetRepo onGetClick={name => dispatch(fetchRepo(name))} />
        <Board issues={this.props.issues} />
      </div>
    );
  }
}

const styles = {
  display: 'flex',
  flexDirection: 'column'
};

App = Radium(App);

function mapStateToProps(state) {
  return {
    issues: state.issues,
    repo: state.repo
  };
}

export default connect(mapStateToProps)(App);
