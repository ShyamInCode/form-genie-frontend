import React, { useState } from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";

export const SortedField = ({
  state,
  setState,
  id,
  type,
  name,
  onCheckboxClick,
  required = false,
  onDefaultValueChange,
  showSettings = false,
}) => {
  const [showOptions, setShowOptions] = useState(false); // State to control the visibility of options

  const toggleOptions = () => {
    setShowOptions(!showOptions); // Toggle the visibility of options
  };

  return (
    <div style={{ width: "100%", marginBottom: "10px" }}>
      <HStack spacing="16px">
        <input
          onChange={(e) => {
            setState(e.target.value);
          }}
          value={state}
          className="text-field2"
          placeholder={`Enter ${name}`}
          id={id}
          key={id}
          required={required}
        />
        {showSettings && (
          <span className="cursor-pointer">
            <SettingsIcon w={5} h={5} color="red.500" onClick={toggleOptions} />
          </span>
        )}
      </HStack>
      {showOptions && ( // Conditionally render options based on showOptions state
        <HStack spacing="16px">
          <div>
            <input
              type="checkbox"
              onChange={() => {
                onCheckboxClick(!required);
              }}
              checked={required}
              key={id}
              id={id}
              className="cursor-pointer"
            />
            <span>{` required?`}</span>
          </div>

          {name !== "Phone Number" ? (
            <>
              <input
                className="defaultValueTab"
                type={type ? type : "text"}
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  onDefaultValueChange(e.target.value);
                }}
                placeholder={`Default Value`}
              />
            </>
          ) : null}
        </HStack>
      )}
    </div>
  );
};
