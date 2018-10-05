import React from 'react';

import * as PropTypes from 'prop-types';
import {
    map as _map

} from 'lodash';


const SelectField = (props) => {
    const { className, onChange, defaultValue, defaultOption, value, options } = props;

    return (
        <select
            className={className}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}>
            <option value={defaultOption.value} >{defaultOption.label}</option>
            {_map(options, (opt, index) => (
                <option key={index} value={index} >{index}</option>
            ))}
        </select>
    )
}
SelectField.PropTypes = {
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
SelectField.defaultProps = {
    defaultValue: '',
    defaultOption: {
        value: '',
        label: 'select..'
    }
}
export default SelectField;

