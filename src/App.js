import React, { Component } from 'react';
import { Row, Col} from 'antd';
import Filters from './containers/filters/index';
import Groups from './containers/groups/index';
import Pokemons from './containers/pokemons/index';

export default class extends Component {
  static displayName = 'App'

  state = {}

  render() {
    return (
      <div>
        <Row className="allGroupsClass">
          <Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 6 }}>
            <Groups />
          </Col>
        </Row>
        <Row className="secondRowClass">
          <Col sm={6} xs={24} >
            <Filters />
          </Col>
          <Col sm={18} xs={24}>
            <Pokemons />
          </Col>
        </Row>
      </div >
    );
  }
}