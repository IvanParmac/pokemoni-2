import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { Button } from 'antd'

export default class extends Component {
  static propTypes = {
    groupSelect: PropTypes.func,
  }

  render(){ 
    return(
      <div>
        <span className="groupClass">
          <Button type="primary" shape="circle" size="large" name="first" onClick={this.props.groupSelect}>
             1
          </Button> 
        </span>
        <span className="groupClass">
          <Button type="primary" shape="circle" size="large" name="second" onClick={this.props.groupSelect}>
            2 
          </Button>
        </span>
        <span className="groupClass">
          <Button type="primary" shape="circle" size="large" name="third" onClick={this.props.groupSelect}>
            3 
          </Button>
        </span>
        <span className="groupClass">
          <Button type="primary" shape="circle" size="large" name="fourth" onClick={this.props.groupSelect}>
            4 
          </Button>
        </span>
      </div>
    )
  }
}