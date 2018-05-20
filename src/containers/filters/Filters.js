import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox, Select } from 'antd';
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
    handleChange: PropTypes.func,
    typeClass: PropTypes.arrayOf(
      PropTypes.string
    )
  }

  render() {
    const {
      typeClass,
      handleFilterChange,
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
          <Group
            onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
            name="currentHeightClass"
            value={currentHeightClass}
          >
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
            onChange={(e) => handleFilterChange(e.target.name, e.target.checked, "checkbox")}
          >
            &lt; 100
          </Checkbox>
          <Checkbox
            name="secondCheckbox"
            style={{ display: "block" }}
            checked={currentWeightClass.secondCheckbox}
            onChange={(e) => handleFilterChange(e.target.name, e.target.checked, "checkbox")}
          >
            &gt;= 100 &amp; &lt;= 200
          </Checkbox>
          <Checkbox
            name="thirdCheckbox"
            style={{ display: "block" }}
            checked={currentWeightClass.thirdCheckbox}
            onChange={(e) => handleFilterChange(e.target.name, e.target.checked, "checkbox")}
          >
            &gt; 200
          </Checkbox>
        </div>
        <div className="firstCollumnFiltersPositioning">
          <h3>Type</h3>
          <Select
            placeholder="Select type"
            style={{ width: 120 }}
            onChange={(value) => handleFilterChange("currentTypeClass", value)}
            value={currentTypeClass}
          >
            {typeClass.map((type, index) => <Option value={type} key={index}>{type}</Option>)}
          </Select>
        </div>
      </div>
    )
  }
}