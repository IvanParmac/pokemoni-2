import React, { Component } from 'react';
import axios from 'axios'
import { Row, Col, Radio, Checkbox, Select, Card, Button, Spin } from 'antd'
const { Group } = Radio;
const { Option } = Select;

export default class extends Component {
  static displayName = 'App'

  state = {
    pokemons: [],
    typeClass: [],
    currentHeightClass: 0,
    currentTypeClass: '',
    currentWeightClass: {
      firstCheckbox: false,
      secondCheckbox: false,
      thirdCheckbox: false
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
    const { pokemons } = this.state;
    let newPokemons = pokemons

    if (this.state.currentTypeClass)
      newPokemons = newPokemons.filter(pokemon => (pokemon.data.types.findIndex(type => type.type.name === this.state.currentTypeClass)) !== -1)

    if (this.state.currentHeightClass === 1) {
      newPokemons = newPokemons.filter((pokemon, index) =>
        parseInt(pokemon.data.height, 10) < 10)
    }

    if (this.state.currentHeightClass === 2) {
      newPokemons = newPokemons.filter((pokemon, index) =>
        parseInt(pokemon.data.height, 10) >= 10 && parseInt(pokemon.data.height, 10) <= 15)
    }

    if (this.state.currentHeightClass === 3) {
      newPokemons = newPokemons.filter((pokemon, index) =>
        parseInt(pokemon.data.height, 10) > 15)
    }


    if (
      this.state.currentWeightClass.firstCheckbox === true &&
      this.state.currentWeightClass.secondCheckbox === false &&
      this.state.currentWeightClass.thirdCheckbox === false) {
      newPokemons = newPokemons.filter((pokemon, index) =>
        parseInt(pokemon.data.weight, 10) < 100)
    }

    if (
      this.state.currentWeightClass.firstCheckbox === false &&
      this.state.currentWeightClass.secondCheckbox === true &&
      this.state.currentWeightClass.thirdCheckbox === false) {
      newPokemons = newPokemons.filter((pokemon, index) =>
        parseInt(pokemon.data.weight, 10) >= 100 && parseInt(pokemon.data.weight, 10) <= 200)
    }

    if (
      this.state.currentWeightClass.firstCheckbox === false &&
      this.state.currentWeightClass.secondCheckbox === false &&
      this.state.currentWeightClass.thirdCheckbox === true) {
      newPokemons = newPokemons.filter((pokemon, index) => parseInt(pokemon.data.weight, 10) > 200)
    }

    if (
      this.state.currentWeightClass.firstCheckbox === true &&
      this.state.currentWeightClass.secondCheckbox === true &&
      this.state.currentWeightClass.thirdCheckbox === false) {
      newPokemons = newPokemons.filter((pokemon, index) => parseInt(pokemon.data.weight, 10) <= 200)
    }

    if (
      this.state.currentWeightClass.firstCheckbox === true &&
      this.state.currentWeightClass.secondCheckbox === false &&
      this.state.currentWeightClass.thirdCheckbox === true) {
      newPokemons = newPokemons.filter((pokemon, index) =>
        parseInt(pokemon.data.weight, 10) < 100 ||
        parseInt(pokemon.data.weight, 10) > 200)
    }

    if (
      this.state.currentWeightClass.firstCheckbox === false &&
      this.state.currentWeightClass.secondCheckbox === true &&
      this.state.currentWeightClass.thirdCheckbox === true) {
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


  onRadioChange = (e) => this.setState({ currentHeightClass: e.target.value })

  onFirstCheckboxChange = (e) =>
    this.setState({
      currentWeightClass: {
        ...this.state.currentWeightClass,
        firstCheckbox: e.target.checked,
      }
    })


  onSecondCheckboxChange = (e) =>
    this.setState({
      currentWeightClass: {
        ...this.state.currentWeightClass,
        secondCheckbox: e.target.checked,
      }
    })

  onThirdCheckboxChange = (e) =>
    this.setState({
      currentWeightClass: {
        ...this.state.currentWeightClass,
        thirdCheckbox: e.target.checked,
      }
    })

  onTypeChange = (value) => this.setState({ currentTypeClass: value })

  groupSelect = (e) => {
    if (e.target.name === 'first') {
      this.setState({
        currentHeightClass: 1,
        currentWeightClass: { firstCheckbox: true, secondCheckbox: false, thirdCheckbox: false },
        currentTypeClass: 'bug'
      })
    }

    if (e.target.name === 'second') {
      this.setState({
        currentHeightClass: 2,
        currentWeightClass: { firstCheckbox: false, secondCheckbox: true, thirdCheckbox: false },
        currentTypeClass: 'poison'
      })
    }

    if (e.target.name === 'third') {
      this.setState({
        currentHeightClass: 3,
        currentWeightClass: { firstCheckbox: false, secondCheckbox: false, thirdCheckbox: true, },
        currentTypeClass: ''
      })
    }

    if (e.target.name === 'fourth') {
      this.setState({
        currentHeightClass: 0,
        currentWeightClass: { firstCheckbox: false, secondCheckbox: false, thirdCheckbox: true, },
        currentTypeClass: 'flying'
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
          <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 6 }}>
            <span className="groupClass"><Button type="primary" shape="circle" size="large" name="first" onClick={this.groupSelect}> 1</Button> </span>
            <span className="groupClass"><Button type="primary" shape="circle" size="large" name="second" onClick={this.groupSelect}>2 </Button></span>
            <span className="groupClass"><Button type="primary" shape="circle" size="large" name="third" onClick={this.groupSelect}>3 </Button></span>
            <span className="groupClass"><Button type="primary" shape="circle" size="large" name="fourth" onClick={this.groupSelect}>4 </Button></span>
          </Col>
        </Row>
        <Row className="secondRowClass">
          <Col md={6} xs={24} >
            <div>
              <h3>Height</h3>
              <Group onChange={this.onRadioChange} value={this.state.currentHeightClass}>
                <Radio style={{ display: "block" }} value={1}> &lt; 10</Radio>
                <Radio style={{ display: "block" }} value={2}>&gt;= 10 &amp; &lt;= 15</Radio>
                <Radio style={{ display: "block" }} value={3}>&gt;= 15</Radio>
              </Group>
            </div>
            <div>
              <h3>Weight</h3>
              <Checkbox style={{ display: "block" }} checked={this.state.currentWeightClass.firstCheckbox} onChange={this.onFirstCheckboxChange}>&lt; 100</Checkbox>
              <Checkbox style={{ display: "block" }} checked={this.state.currentWeightClass.secondCheckbox} onChange={this.onSecondCheckboxChange}>&gt;= 100 &amp; &lt;= 200</Checkbox>
              <Checkbox style={{ display: "block" }} checked={this.state.currentWeightClass.thirdCheckbox} onChange={this.onThirdCheckboxChange}>&gt;= 15</Checkbox>
            </div>
            <div>
              <h3>Type</h3>
              <Select placeholder="Select type" style={{ width: 120 }} onChange={this.onTypeChange} value={this.state.currentTypeClass}>
                {this.state.typeClass.map((type, index) => <Option value={type} key={index}>{type}</Option>)}
              </Select>
            </div>
          </Col>
          <Col md={18} xs={24}>
            {this.renderPokemons()}
          </Col>
        </Row>
      </div >
    );
  }
}