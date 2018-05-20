import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

export default class extends Component {
  static propTypes = {
    groupSelect: PropTypes.func,
  }

  render() {
    return (
      <div>
        <span className="groupClass">
          <Button
            type="primary"
            shape="circle"
            size="large"
            name="first"
            onClick={e => this.props.groupSelect(e.target.name)}
          >
            1
          </Button>
        </span>
        <span className="groupClass">
          <Button
            type="primary"
            shape="circle"
            size="large"
            name="second"
            onClick={e => this.props.groupSelect(e.target.name)}
          >
            2
          </Button>
        </span>
        <span className="groupClass">
          <Button
            type="primary"
            shape="circle"
            size="large"
            name="third"
            onClick={e => this.props.groupSelect(e.target.name)}
          >
            3
          </Button>
        </span>
        <span className="groupClass">
          <Button
            type="primary"
            shape="circle"
            size="large"
            name="fourth"
            onClick={e => this.props.groupSelect(e.target.name)}
          >
            4
          </Button>
        </span>
      </div>
    )
  }
}