import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox, Select } from 'antd'
const { Group } = Radio;
const { Option } = Select;

export default class extends Component {
  static propTypes = {
    filters: PropTypes.shape({
      currentHeightClass: PropTypes.number,
      currentWeightClass: PropTypes.shape({
        firstCheckbox: PropTypes.bool,
        secondCheckbox: PropTypes.bool,
        thirdCheckbox: PropTypes.bool,
      }),
      currentTypeClass: PropTypes.string,
    }),
    onRadioChange: PropTypes.func,
    onCheckboxChange:PropTypes.func,
    onTypeChange:PropTypes.func,
    typeClass:PropTypes.arrayOf(
      PropTypes.string
    )
  }

  render() {
    const {
      typeClass,
      onRadioChange,
      onCheckboxChange,
      onTypeChange,
      filters: {
        currentHeightClass,
        currentWeightClass,
        currentTypeClass,
      }
    } = this.props

    return (
      <div className="firstCollumnPositioning">
        <div className="firstCollumnFiltersPositioning">
          <h3>Height</h3>
          <Group onChange={onRadioChange} value={currentHeightClass}>
            <Radio style={{ display: "block" }} value={1}> &lt; 10</Radio>
            <Radio style={{ display: "block" }} value={2}>&gt;= 10 &amp; &lt;= 15</Radio>
            <Radio style={{ display: "block" }} value={3}>&gt;= 15</Radio>
          </Group>
        </div>
        <div className="firstCollumnFiltersPositioning">
          <h3>Weight</h3>
          <Checkbox
            name="firstCheckbox"
            style={{ display: "block" }}
            checked={currentWeightClass.firstCheckbox}
            onChange={onCheckboxChange}
          >
            &lt; 100
          </Checkbox>
          <Checkbox
            name="secondCheckbox"
            style={{ display: "block" }}
            checked={currentWeightClass.secondCheckbox}
            onChange={onCheckboxChange}
          >
            &gt;= 100 &amp; &lt;= 200
          </Checkbox>
          <Checkbox
            name="thirdCheckbox"
            style={{ display: "block" }}
            checked={currentWeightClass.thirdCheckbox}
            onChange={onCheckboxChange}
          >
            &gt; 200
          </Checkbox>
        </div>
        <div className="firstCollumnFiltersPositioning">
          <h3>Type</h3>
          <Select placeholder="Select type" style={{ width: 120 }} onChange={onTypeChange} value={currentTypeClass}>
            {typeClass.map((type, index) => <Option value={type} key={index}>{type}</Option>)}
          </Select>
        </div>
      </div>
    )
  }
}