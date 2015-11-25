import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchIssues} from '../actions/issues';
import {fetchRepo} from '../actions/repos';
import GetRepo from '../components/GetRepo';

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
      <div>
        <button onClick={::this.getIssues}>Get Issues</button>
        <GetRepo onGetClick={name => dispatch(fetchRepo(name))} />
        <ul>
          {this.props.issues.map(issue => {
            return (
              <li>
                Issue: {JSON.stringify(issue)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    issues: state.issues,
    repo: state.repo
  };
}

export default connect(mapStateToProps)(App);
