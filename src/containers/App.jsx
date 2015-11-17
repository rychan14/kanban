import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as issueActions from '../actions/issues';
import * as repoActions from '../actions/repos';

// Babel ES7 decorators not working currently...
// Connect at bottom
// @connect((state) => {
//   return {
//     issues: state.issues
//   };
// })

class Board extends React.Component {
  getIssues() {
    let repoName = 'MrArnoldPalmer/kanban';

    this.props.dispatch(issueActions.fetchIssues(repoName));
  }
  getRepo() {
    let fullName = 'MrArnoldPalmer/kanban';

    this.props.dispatch(repoActions.loadRepo(fullName));
  }
  render() {
    let {issues} = this.props;

    return (
      <div>
        <button onClick={::this.getIssues}>Get Issues</button>
        <button onClick={::this.getRepo}>Get Repo</button>
        <ul>
          {issues.map(issue => {
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
    issues: state.issues
  };
}

export default connect(mapStateToProps)(Board);
