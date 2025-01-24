// @flow
import React from "react";

export const CustomField = ({
  state,
  setState,
  id,
  name,
  type,
  options,
  requiredState,
}) => {
  if (type === "date") {
    return (
      <div style={{ width: "50%" }}>
        <input
          value={state}
          onChange={(e) => {
            setState(this.target.value);
          }}
          className="text-field2"
          placeholder={`Enter ${name}`}
          id={id}
          type={type}
          style={{ marginLeft: "-11px" }}
          required={requiredState}
        />
      </div>
    );
  } else if (type === "Dropdown") {
    //checking dropdown condition here
    return (
      <div style={{ width: "100%" }}>
        <select onChange={(e) => {}} className="text-field2" id={id}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    return (
      <div style={{ width: "100%" }}>
        <select onChange={(e) => {}} className="dropdown" id={id}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* <input
          onChange={(e) => {
          }}
          className="text-field2"
          placeholder={`Enter ${name}`}
          id={id}
          type={type}
        />*/}
      </div>
    );
  }
};
