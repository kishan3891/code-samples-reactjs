import { Select } from 'antd';
import React, { useCallback, useState } from 'react';
import useWindowDimensions from '../../hooks/windowSize';
import { DropDownArrow } from "@components/icons/drop-down-arrow";
import { CheckMarkArrow } from "@components/icons/check-mark";

const { Option } = Select;

interface opt {
    id: any;
    name: string;
}

interface Props {
    onChange: (boolean) => void;
    placeholder: string;
    name: string;
    options: opt[];
    defaultValue: {
        id: any;
        name: string;
    };
    selected: any;
}

export default function DropDownFilter({ onChange, placeholder, name, options, defaultValue, selected }: Props) {
    const [value, setvalue] = useState(selected);
    const handleChange = useCallback(
        (value) => {
            setvalue(value);
            onChange(value);
        },
        [onChange, name],
    );
    const windowDimensions = useWindowDimensions();

    return (
        <Select
            className={value !== defaultValue.id ? 'ant-select-open-drop' : null}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            dropdownStyle={{ width: '100%', maxWidth: '495px' }}
            style={{ width: '100%' }}
            suffixIcon={<DropDownArrow className="ant-select-suffix" />}
            listHeight={300}
            menuItemSelectedIcon={<CheckMarkArrow />}
            dropdownMatchSelectWidth={windowDimensions.width <= 767}
            getPopupContainer={() => document.getElementById('courses-filter')}
        >
            {defaultValue && <Option value={defaultValue.id}>{defaultValue.name}</Option>}
            {options &&
                options.map((opt) => (
                    <Option value={opt.id} key={opt.id}>
                        {opt.name}
                    </Option>
                ))}
        </Select>
    );
}
