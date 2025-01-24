import axios from "axios";

export const createForm = async (formDetails) => {
  var newFields = formDetails.formInputs.map((key, index) => {
    var fieldType = "Text";

    if (key.name === "Email") {
      fieldType = "EmailAddress";
    }

    return {
      CustomerKey: key.name,
      Name: key.name,
      Field: fieldType,
      MaxLength: 50,
      IsRequired: true,
      IsPrimaryKey:
        key?.name === "Email" || key?.name === "SubscriberKey" ? true : false,
    };
  });

  const body = {
    clientId: "iamcpm8irve0qhxyabmf845l", //should change
    clientSecret: "YEodDueTGfJBu6M231RUwBgI", //should change
    subdomain: "mclxdpbrg2n9j1y8ftm46zszshqy", //should change
    accountId: "514006027", //should change
    customerName: "Aadhit", //should change
    fields: newFields,
    metaData: formDetails,
  };

  axios
    .post("https://webformdata.herokuapp.com/v1/form", body)
    .then((res) => {
      const data = res.data.data.id;
      return data;
    })
    .catch((err) => {
      return false;
    });
};
