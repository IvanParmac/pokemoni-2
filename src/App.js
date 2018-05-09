import React, { Component } from 'react';
import axios from 'axios'
import { Row, Col, Card, Spin } from 'antd'
import Filters from './Filters'
import Groups from './Groups'

export default class extends Component {
  static displayName = 'App'

  state = {
    pokemons: [],
    typeClass: [],
    filters: {
      currentHeightClass: 0,
      currentTypeClass: '',
      currentWeightClass: {
        firstCheckbox: false,
        secondCheckbox: false,
        thirdCheckbox: false
      }
    },
    currentGroupClass: 0,
  }

  componentWillMount() {
    axios.get('http://pokeapi.co/api/v2/pokemon?limit=15')
      .then((response) => {
        if (response.data.results && response.data.results.length !== 0) {
          response.data.results.forEach((pokemon, index) => {
            axios.get(pokemon.url)
              .then((response2) => {
                const newTypes = response2.data.types.map((type, index1) => type.type.name);
                const allTypes = [...this.state.typeClass, ...newTypes];

                this.setState({
                  pokemons: [...this.state.pokemons, response2],
                  typeClass: allTypes.filter((type, index, array) => array.indexOf(type) === index)
                })
              })
          });
        }
      })
  }

  renderPokemons = () => {
    const { pokemons, filters: { currentTypeClass, currentHeightClass, currentWeightClass } } = this.state;
    let newPokemons = pokemons

    if (currentTypeClass)
      newPokemons = newPokemons.filter(pokemon => (pokemon.data.types.findIndex(type => type.type.name === currentTypeClass)) !== -1)

    if (currentHeightClass === 1) {
      newPokemons = newPokemons.filter((pokemon, index) =>
        parseInt(pokemon.data.height, 10) < 10)
    }

    if (currentHeightClass === 2) {
      newPokemons = newPokemons.filter((pokemon, index) =>
        parseInt(pokemon.data.height, 10) >= 10 && parseInt(pokemon.data.height, 10) <= 15)
    }

    if (currentHeightClass === 3) {
      newPokemons = newPokemons.filter((pokemon, index) =>
        parseInt(pokemon.data.height, 10) > 15)
    }


    if (currentWeightClass.firstCheckbox === true &&
      currentWeightClass.secondCheckbox === false &&
      currentWeightClass.thirdCheckbox === false) {
      newPokemons = newPokemons.filter((pokemon, index) =>
        parseInt(pokemon.data.weight, 10) < 100)
    }

    if (currentWeightClass.firstCheckbox === false &&
      currentWeightClass.secondCheckbox === true &&
      currentWeightClass.thirdCheckbox === false) {
      newPokemons = newPokemons.filter((pokemon, index) =>
        parseInt(pokemon.data.weight, 10) >= 100 && parseInt(pokemon.data.weight, 10) <= 200)
    }

    if (currentWeightClass.firstCheckbox === false &&
      currentWeightClass.secondCheckbox === false &&
      currentWeightClass.thirdCheckbox === true) {
      newPokemons = newPokemons.filter((pokemon, index) => parseInt(pokemon.data.weight, 10) > 200)
    }

    if (currentWeightClass.firstCheckbox === true &&
      currentWeightClass.secondCheckbox === true &&
      currentWeightClass.thirdCheckbox === false) {
      newPokemons = newPokemons.filter((pokemon, index) => parseInt(pokemon.data.weight, 10) <= 200)
    }

    if (currentWeightClass.firstCheckbox === true &&
      currentWeightClass.secondCheckbox === false &&
      currentWeightClass.thirdCheckbox === true) {
      newPokemons = newPokemons.filter((pokemon, index) =>
        parseInt(pokemon.data.weight, 10) < 100 ||
        parseInt(pokemon.data.weight, 10) > 200)
    }

    if (currentWeightClass.firstCheckbox === false &&
      currentWeightClass.secondCheckbox === true &&
      currentWeightClass.thirdCheckbox === true) {
      newPokemons = newPokemons.filter((pokemon, index) => parseInt(pokemon.data.weight, 10) >= 100)
    }

    return newPokemons.map((pokemon, index) => (
      <div key={index} >
        <Card title={pokemon.data.name} style={{ width: 600 }}>
          <p>type:&nbsp;{this.renderTypes(pokemon.data.types)}</p>
          <p>height:&nbsp;{pokemon.data.height}</p>
          <p>weight:&nbsp;{pokemon.data.weight}</p>
        </Card>
      </div>
    ));
  }

  renderTypes = (types) =>
    types.map((type, index) =>
      <span key={index}>{type.type.name}&nbsp;&nbsp;</span>
    )


  onRadioChange = (e) =>
    this.setState({
      filters: {
        ...this.state.filters,
        currentHeightClass: e.target.value
      }
    })

  onCheckboxChange = (e) =>
    this.setState({
      filters: {
        ...this.state.filters,
        currentWeightClass: {
          ...this.state.filters.currentWeightClass,
          [e.target.name]: e.target.checked,
        }
      }
    })
  
  onTypeChange = (value) =>
    this.setState({
      filters: {
        ...this.state.filters,
        currentTypeClass: value
      }
    })

  groupSelect = (e) => {
    if (e.target.name === 'first') {
      this.setState({
        filters: {
          ...this.state.filters,
          currentHeightClass: 1,
          currentWeightClass: { firstCheckbox: true, secondCheckbox: false, thirdCheckbox: false },
          currentTypeClass: 'bug'
        }
      })
    }

    if (e.target.name === 'second') {
      this.setState({
        filters: {
          ...this.state.filters,
          currentHeightClass: 2,
          currentWeightClass: { firstCheckbox: false, secondCheckbox: true, thirdCheckbox: false },
          currentTypeClass: 'poison'
        }
      })
    }

    if (e.target.name === 'third') {
      this.setState({
        filters: {
          ...this.state.filters,
          currentHeightClass: 3,
          currentWeightClass: { firstCheckbox: false, secondCheckbox: false, thirdCheckbox: true, },
          currentTypeClass: ''
        }
      })
    }

    if (e.target.name === 'fourth') {
      this.setState({
        filters: {
          ...this.state.filters,
          currentHeightClass: 0,
          currentWeightClass: { firstCheckbox: false, secondCheckbox: false, thirdCheckbox: true, },
          currentTypeClass: 'flying'
        }
      })
    }
  }

  render() {
    if (this.state.pokemons.length < 15) {
      return <Spin size="large" tip="Loading..." style={{ width: '100vw', marginTop: '100px' }} />
    }

    return (
      <div>
        <Row className="allGroupsClass">
          <Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 6 }}>
            <Groups
              groupSelect={this.groupSelect}
            />
          </Col>
        </Row>
        <Row className="secondRowClass">
          <Col sm={6} xs={24} >
            <Filters
              onRadioChange={this.onRadioChange}
              onCheckboxChange={this.onCheckboxChange}
              onTypeChange={this.onTypeChange}
              typeClass={this.state.typeClass}
              filters={this.state.filters}
            />
          </Col>
          <Col sm={18} xs={24}>
            {this.renderPokemons()}
          </Col>
        </Row>
      </div >
    );
  }
}