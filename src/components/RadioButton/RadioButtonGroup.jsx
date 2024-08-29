import React, { useState } from "react";
import RadioButton from "./RadioButton";

export default function RadioButtonGroup({ options, onChange, components }) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (newValue) => {
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      {options.map((option) => (
        <RadioButton
          key={option.id}
          name="group1"
          value={option.id}
          id={`radio-${option.id}`}
          checked={selectedValue === option.value}
          onChange={() => handleRadioChange(option.value)}
        >
          {components}
        </RadioButton>
      ))}
      ;
    </>
  );
}
