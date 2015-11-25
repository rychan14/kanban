import React, {Component, PropTypes} from 'react';

export default class GetRepo extends Component {
  handleClick(e) {
    const name = this.refs.name.value.trim();
    this.props.onGetClick(name);
    this.refs.name.value = '';
  }
  render() {
    return (
      <div>
        <input type='text' ref='name' />
        <button onClick={e => this.handleClick(e)}>
          Get Repo Info
        </button>
      </div>
    );
  }
}

GetRepo.propTypes =  {
  onGetClick: PropTypes.func.isRequired
};
