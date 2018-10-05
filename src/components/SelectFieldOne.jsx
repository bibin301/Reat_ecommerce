import React from 'react';

import * as PropTypes from 'prop-types';
import {
    map as _map,

} from 'lodash';


const SelectFieldOne = (props) => {
    const { className, onChange, defaultValue, defaultOption, value, options } = props;
  

    return (
        <select
            className={className}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}>
            <option value={defaultOption.value} >{defaultOption.label}</option>
            {_map(options, (opt, index) => (
                <option key={index} value={opt.address || opt.name} > {opt.name}</option>
            ))}
        </select>
    )
}
SelectFieldOne.PropTypes = {
    className: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.number
    ]),
    value: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    defaultOption: PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.any,
    }).isRequired,
    options: PropTypes.arrayOf(PropTypes.any).isRequired,
    onChange: PropTypes.func.isRequired

}
SelectFieldOne.defaultProps = {
    defaultValue: '',
    defaultOption: {
        value: '',
        label: 'select..'
    }
}
export default SelectFieldOne;

