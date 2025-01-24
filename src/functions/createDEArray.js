export const createDEArray = (formJSON) => {
  var fields = formJSON.formInputs.map((key, index) => {
    var fieldType = "Text",
      field = "Text";

    if (key.name === "Email") {
      fieldType = "EmailAddress";
      field = "EmailAddress";
    }
    if (key.name === "Phone Number") {
      fieldType = "Phone";
      field = "Phone";
    }
    if (key?.type) {
      switch (key?.type) {
        case "date":
          fieldType = "Date";
          field = "Date";
          break;
        case "number":
          fieldType = "Number";
          field = "Number";
          break;
        case "dropdown":
          fieldType = "Text";
          field = "Dropdown";
          break;
        case "checkbox":
          fieldType = "Boolean";
          field = "Boolean";
          break;
        case "textarea":
          fieldType = "Text";
          field = "Textarea";
          break;
        case "email":
          fieldType = "EmailAddress";
          field = "EmailAddress";
          break;
        default:
          fieldType = "Text";
          field = "Text";
      }
    }

    const fieldsMade = {
      CustomerKey: key.name,
      Name: key.name,
      FieldType: fieldType,
      Field: field,
      MaxLength: 50,
      IsRequired:
        key?.name === "SubscriberKey" || key?.required === true ? true : false,
      IsPrimaryKey:
        key?.name === "Email" || key?.name === "SubscriberKey" ? true : false,
      options: key.options || [], //for dropdown
      DefaultValue: key.defaultValue,
    };

    if (
      key?.type === "date" ||
      key?.type === "checkbox" ||
      key?.type === "number"
    ) {
      delete fieldsMade.MaxLength;
    }

    if (key?.name === "Phone Number" || key?.type === "dropdown") {
      delete fieldsMade.DefaultValue;
    }

    return fieldsMade;
  });

  return fields;
};
