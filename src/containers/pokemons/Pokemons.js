import React, { Component } from 'react';
import { Card, Spin } from 'antd';
import PropTypes from 'prop-types';

export default class extends Component {
  static propTypes = {
    pokemons: PropTypes.arrayOf(
      PropTypes.shape()
    ),
    typeClass: PropTypes.arrayOf(
      PropTypes.string
    ),
    filters: PropTypes.shape()
  }

  componentWillMount() {
    this.props.fetchAllPokemons()
  }

  renderPokemons = () => {
    const { pokemons, filters: { currentTypeClass, currentHeightClass, currentWeightClass } } = this.props;
    let newPokemons = pokemons

    if (currentTypeClass)
      newPokemons = newPokemons.filter(pokemon =>
        (pokemon.data.types.findIndex(type => type.type.name === currentTypeClass)) !== -1
      )

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

  render() {
    if (this.props.pokemons.length < 15) {
      return <Spin size="large" tip="Loading..." style={{ width: '100%', marginTop: '100px' }} />
    }

    return (
      <div>
        {this.renderPokemons()}
      </div>
    )
  }
}