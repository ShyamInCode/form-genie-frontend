import React, { useState, useEffect } from "react";
import { Flex, Input, Text, Spacer } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import { FIELD_TYPES } from "../../views/constants";

const ListTypes = [
  "text",
  "date",
  "email",
  "number",
  "checkbox",
  "dropdown",
  "textarea",
];

export const CustomFieldEdit = ({ state, id, setState, fieldData = null }) => {
  console.log(id);
  const [selectOptions, setSelectOptions] = useState([""]);
  const [placeholder, setPlaceholder] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [type, setType] = useState("");
  const [required, setRequired] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  useEffect(() => {
    if (fieldData) {
      setSelectOptions(fieldData.options || [""]);
      setPlaceholder(fieldData.name || "");
      setType(fieldData.type || "");
      setRequired(fieldData.required || false);
      setDefaultValue(fieldData.defaultValue || "");
      if (fieldData && fieldData.options) {
        setSelectOptions(fieldData.options);
      }
    }
  }, [fieldData]);

  return (
    <div
      className="CustomField1"
      style={{
        flexDirection: "column",
        marginBottom: "1em",
        padding: "1em",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <select
        onChange={(e) => {
          setType(e.target.value);
          setDisabled(false);
        }}
        className="text-field2"
        name="field-type"
        id="type"
      >
        {ListTypes.map((text, key) => (
          <option key={key} value={text}>
            {text}
          </option>
        ))}
      </select>
      <label
        htmlFor={fieldData && fieldData.id ? fieldData.id : id}
        style={{ display: "none" }}
      >
        Enter your field name
      </label>
      <input
        onChange={(e) => {
          setPlaceholder(e.target.value);
          setDisabled(false);
          setState(e.target.value);
        }}
        id={fieldData && fieldData.id ? fieldData.id : id}
        className="text-field2"
        value={placeholder}
        placeholder="Enter your field name"
      />
      {type !== "dropdown" && (
        <>
          <div>
            <label>
              <input
                type="checkbox"
                checked={required}
                onChange={() => {
                  setDisabled(false);
                  setRequired(!required);
                }}
                className="cursor-pointer"
              />{" "}
              required?
            </label>
          </div>
          {type !== "email" && type !== "number" && (
            <div>
              <input
                className="defaultValueTab"
                type={type ? type : "text"}
                onChange={(e) => {
                  setDefaultValue(e.target.value);
                  setDisabled(false);
                }}
                placeholder={` Add Default Value`}
              />
            </div>
          )}
        </>
      )}
      {type === "dropdown" && (
        <Flex direction="column">
          <Flex direction="row" xs={12} justifyContent={"space-between"}>
            <Text fontWeight="medium" lineHeight={6} mb={3}>
              Options
            </Text>
            <AddIcon
              onClick={() => {
                selectOptions.push("");
                setSelectOptions([...selectOptions]);
              }}
            />
          </Flex>
          {selectOptions.map((option, key) => {
            return (
              <Flex
                key={key}
                minWidth="max-content"
                alignItems="center"
                gap="2"
              >
                <Input
                  onChange={(event) => {
                    setDisabled(false);
                    selectOptions[key] = event.target.value;
                    setSelectOptions(selectOptions);
                  }}
                  defaultValue={option}
                />
                <Spacer />
                <CloseIcon
                  boxSize={3}
                  onClick={() => {
                    setDisabled(false);
                    selectOptions.splice(key, 1);
                    setSelectOptions(selectOptions);
                  }}
                />
              </Flex>
            );
          })}
        </Flex>
      )}
      <div
        style={{
          marginTop: "0.5em",
          display: "flex",
          justifyContent: "flex-end",
          width: "-webkit-fill-available",
        }}
      >
        <button
          onClick={() => {
            const data = state.find((value) =>
              value.id === fieldData && fieldData.id ? fieldData.id : id
            );
            setState({ action: "DELETE", data });
          }}
          style={{ background: "rgba(146, 146, 146, 0.87)" }}
          className="add-field-btn"
        >
          Delete
        </button>
        {disabled ? (
          <button className="add-field-btn-disabled" disabled>
            Add
          </button>
        ) : (
          <button
            onClick={() => {
              let obj = state.find((value) =>
                value.id === fieldData && fieldData.id ? fieldData.id : id
              );
              if (obj) {
                obj = {
                  name: placeholder,
                  id,
                  type: type,
                  show: true,
                  fieldType: FIELD_TYPES.CUSTOM,
                  options: selectOptions,
                  required: required,
                  defaultValue: defaultValue,
                };
              } else {
                obj = {
                  name: placeholder,
                  id,
                  type: type,
                  show: true,
                  fieldType: FIELD_TYPES.CUSTOM,
                  options: selectOptions,
                  required: required,
                  defaultValue: defaultValue,
                };
              }
              {
                if (fieldData && fieldData.id) {
                  setState({ action: "UPDATE", data: obj });
                  document.getElementById("add-button-" + id).innerText = "Add";
                } else {
                  setState({ action: "ADD", data: obj });
                  document.getElementById("add-button-" + id).innerText =
                    "Update";
                }
              }
              setDisabled(true);
            }}
            id={"add-button-" + (id || fieldData.id)}
            className="add-field-btn"
          >
            {fieldData && fieldData.id ? "Update" : "Add"}
          </button>
        )}
      </div>
    </div>
  );
};
