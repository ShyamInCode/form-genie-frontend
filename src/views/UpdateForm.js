/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../App.css";
import { FormField } from "../components/template-components/FormField";
import { SortedField } from "../components/template-components/SortedField";
import { ReactSortable } from "react-sortablejs";
import { AddCustomField } from "../components/template-components/AddCustomField";
import { CustomField } from "../components/template-components/CustomField";
import { CustomFieldEdit } from "../components/template-components/CustomFieldEdit";
import { ClientId, Subdomain } from "../functions/Sfmc";
import {
  Flex,
  Heading,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  Checkbox,
  Textarea,
  Select,
  Input,
} from "@chakra-ui/react";
import formRight from "../assets/formRight.png";
import formPage from "../assets/page.png";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Close from "../assets/Close";
import { createDEArray } from "../functions/createDEArray";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FIELD_TYPES, GOOGLE_FONTS } from "./constants";

function UpdateForm() {
  const [formData, setFormData] = useState();
  let { formId } = useParams();

  const [URLSearchParams] = useSearchParams();

  const [formWidth, setFormWidth] = useState();
  const [bgColor, setBgColor] = useState();
  const [heading, setHeading] = useState();
  const [submitButtonText, setSubmitButtonText] = useState();
  const [submitButtonUrl, setSubmitButtonUrl] = useState(); // State added for button url
  const [selectedFontOne, setSelectedFontOne] = useState(); // Font selection state
  const [submittedText, setSubmittedText] = useState(); //Success Message Text
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState("center");

  ///////////////////////////////////////////////
  const [isFiredEntryEvent, setIsFiredEntryEvent] = useState();
  //const [firedEntryEmail, setFiredEmail] = useState("");
  const [firedEventDefinitionKey, setFiredEventDefinitionKey] = useState();

  const [isTriggerSend, setIsTriggerSend] = useState();
  //const [triggerEmail, setTriggerEmail] = useState("");
  const [triggerExternalKey, setTriggerExternalKey] = useState();
  // Define your preview form styles
  const previewFormStyles = {
    fontFamily: selectedFontOne,
    // Add other styles here...
  };

  const [fntColor, setFntColor] = useState();
  const [inputLabelColor, setInputColor] = useState();
  const [btnColor, setBtnColor] = useState();
  const [btnFntColor, setBtnFntColor] = useState();
  // const [logo, setLogo] = useState('');
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [DOB, setDOB] = useState("");
  const [msg, setMsg] = useState("");
  const [customField, setCustomField] = useState([]);
  const [fileUrl, setFileUrl] = useState();
  const [file, setFile] = useState();
  //required status states
  const [firstGroup, setFirstGroup] = useState([
    {
      state: firstName,
      setState: setFirstName,
      name: "First Name",
      id: "first-name-check",
      required: false,
      defaultValue: "",
      fieldType: FIELD_TYPES.DEFAULT,
    },
    {
      state: LastName,
      setState: setLastName,
      name: "Last Name",
      id: "last-name-check",
      required: false,
      defaultValue: "",
      fieldType: FIELD_TYPES.DEFAULT,
    },
    {
      state: phone,
      setState: setPhone,
      name: "Phone Number",
      id: "phone-number-check",
      required: false,
      defaultValue: "",
      fieldType: FIELD_TYPES.DEFAULT,
    },
    {
      state: address,
      setState: setAddress,
      name: "Street Address",
      id: "street-address-check",
      required: false,
      defaultValue: "",
      fieldType: FIELD_TYPES.DEFAULT,
    },
    {
      state: city,
      setState: setCity,
      name: "City",
      id: "city-check",
      required: false,
    },
    {
      state: postcode,
      setState: setPostcode,
      name: "Postal Code",
      id: "postal-code-check",
      required: false,
      defaultValue: "",
      fieldType: FIELD_TYPES.DEFAULT,
    },
    {
      state: stateName,
      setState: setStateName,
      name: "State",
      id: "state-check",
      required: false,
      defaultValue: "",
      fieldType: FIELD_TYPES.DEFAULT,
    },
    {
      state: country,
      setState: setCountry,
      name: "Country",
      id: "country-check",
      required: false,
      defaultValue: "",
      fieldType: FIELD_TYPES.DEFAULT,
    },
    {
      state: companyName,
      setState: setCompanyName,
      name: "Company Name",
      id: "company-name-check",
      required: false,
      defaultValue: "",
      fieldType: FIELD_TYPES.DEFAULT,
    },
    {
      state: title,
      setState: setTitle,
      name: "Job Tile",
      id: "job--title-check",
      required: false,
      defaultValue: "",
      fieldType: FIELD_TYPES.DEFAULT,
    },
    {
      state: url,
      setState: setUrl,
      name: "Website URL",
      id: "url-check",
      required: false,
      defaultValue: "",
      fieldType: FIELD_TYPES.DEFAULT,
    },
    {
      state: msg,
      setState: setMsg,
      name: "Message",
      id: "msg-check",
      required: false,
      defaultValue: "",
      fieldType: FIELD_TYPES.DEFAULT,
    },
    {
      state: DOB,
      setState: setDOB,
      name: "Date Of Birth",
      id: "dob-check",
      defaultValue: "",
      fieldType: FIELD_TYPES.DEFAULT,
      required: false,
      type: "date",
    },
  ]);
  const [secondGroup, setSecondGroup] = useState([]);

  async function fetchForm() {
    try {
      const response = await axios.get(
        "https://webformdata.herokuapp.com/v1/form/" + formId
      );
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error if needed
    }
  }

  useEffect(() => {
    //fetching form data
    fetchForm()
      .then((form) => {
        setFormData(form.data.data);
      })
      .catch((error) => {
        console.error("Error in fetchData:", error);
      });
  }, []);

  useEffect(() => {
    //adding existing fields to the second group
    if (formData && formData.metaData.formInputs) {
      setSecondGroup(formData.metaData.formInputs);
    }
  }, [formData]);
  useEffect(() => {
    //adding existing fields to the second group
    if (formData && formData.id) {
      localStorage.setItem("uuid", formData.id);
    }
  }, [formData]);

  useEffect(() => {
    //removing already existing fields from first group
    if (secondGroup) {
      const filteredFirstGroup = firstGroup.filter(
        (item) => !secondGroup.some((secondItem) => secondItem.id === item.id)
      );
      setFirstGroup(filteredFirstGroup);
    }
  }, [secondGroup]);

  useEffect(() => {
    //setting metadata
    if (formData) {
      window.localStorage.setItem(
        "formMetaData",
        JSON.stringify(formData.metaData)
      );
      window.localStorage.setItem("formArray", JSON.stringify(formData.fields));
      setBgColor(formData.metaData.formBGColor);
      setHeading(formData.metaData.formHeading);
      setFntColor(formData.metaData.formHeadingFontColor);
      setInputColor(formData.metaData.inputLabelColor);
      setBtnColor(formData.metaData.formSubmitColor);
      setBtnFntColor(formData.metaData.formSubmitFontColor);
      setPosition(formData.metaData.position);
      setFormWidth(formData.metaData.formWidth);
      setSelectedFontOne(formData.metaData.selectedFontOne);
      setSubmitButtonText(formData.metaData.submitButtonText);
      setSubmitButtonUrl(formData.metaData.submitButtonUrl);
      setIsTriggerSend(formData.metaData.triggerSend.state);
      setTriggerExternalKey(formData.metaData.triggerSend.triggerExternalKey);
      setIsFiredEntryEvent(formData.metaData.fireEntryEvent.state);
      setFiredEventDefinitionKey(
        formData.metaData.fireEntryEvent.EventDefinitionKey
      );

      if (formData.metaData.subscriberKey) {
        const checkbox = document.getElementById(
          "customSubscriberKey-checkbox"
        );
        checkbox.checked = true;
      }

      if (formData.metaData.submissionFlag) {
        const checkbox = document.getElementById("submit-checkbox");
        checkbox.checked = true;
      }

      if (formData.metaData.cancelFlag) {
        const checkbox = document.getElementById("sevenday-checkbox");
        checkbox.checked = true;
      }
    }
  }, [formData]);

  //alternatives
  function handleCheckboxClick(id, newRequiredState) {
    const updatedFirstGroup = [...firstGroup];
    const index = updatedFirstGroup.findIndex((item) => item.id === id);
    if (index !== -1) {
      updatedFirstGroup[index].required = newRequiredState;
      setFirstGroup(updatedFirstGroup);
    }
  }

  function handleDefaultValueChange(id, newDefaultValue) {
    const updatedFirstGroup = [...firstGroup];
    const index = updatedFirstGroup.findIndex((item) => item.id === id);
    if (index !== -1) {
      updatedFirstGroup[index].defaultValue = newDefaultValue;
      updatedFirstGroup[index].state = newDefaultValue;
      setFirstGroup(updatedFirstGroup);
    }
  }

  async function submitForm(fileURL) {
    var formInputs = [...secondGroup, ...customField];
    formInputs = formInputs.map((key, index) => {
      return {
        ...key,
        name: key.name,
      };
    });

    const submitCheckbox = document.getElementById("submit-checkbox").checked;
    const sevendayCheckbox =
      document.getElementById("sevenday-checkbox").checked;

    const customSubscriberKey = document.getElementById(
      "customSubscriberKey-checkbox"
    ).checked;

    const formJSON = {
      formBGColor: bgColor,
      formHeading: heading,
      formHeadingFontColor: fntColor,
      inputLabelColor: inputLabelColor,
      formSubmitColor: btnColor,
      formSubmitFontColor: btnFntColor,
      formInputs: formInputs,
      submissionFlag: submitCheckbox,
      cancelFlag: sevendayCheckbox,
      subscriberKey: customSubscriberKey,
      emailFlag: false,
      position: position,
      formWidth: formWidth,
      selectedFontOne: selectedFontOne,
      submitButtonText: submitButtonText,
      submitButtonUrl: submitButtonUrl, // State added for button url
      successMessageText: submittedText,

      logoURL: fileURL,
      triggerSend: {
        state: isTriggerSend,
        //email: triggerEmail,
        externalKey: triggerExternalKey,
      },
      fireEntryEvent: {
        state: isFiredEntryEvent,
        //email: firedEntryEmail,
        EventDefinitionKey: firedEventDefinitionKey,
      },
    };

    var newFields = createDEArray(formJSON);

    window.localStorage.setItem("formMetaData", JSON.stringify(formJSON));
    window.localStorage.setItem("formArray", JSON.stringify(newFields));

    window.open(
      `${Subdomain}v2/authorize?response_type=code&client_id=${ClientId}&redirect_uri=${window.location.origin}/form/update/redirect`,
      "_self"
    );
  }

  async function handleFileUpload() {
    setIsLoading(true);

    if (!file) {
      submitForm(null);
      return;
    }

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          submitForm(downloadURL);
        });
      }
    );
  }

  return (
    <main className="main">
      <div style={{ display: "flex" }}>
        <div className="container2">
          <section className="wrapper1">
            <div className="SelectionBox">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="form-Selector"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="subTitleShape" />
                  <h3 className="subHeading">Form Design</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormField
                    state={bgColor}
                    setState={setBgColor}
                    className={"label-style"}
                    name={"Background Color"}
                    id={"bg-color"}
                    type={"color"}
                  />
                  <Flex className="sp-between" pl={2.5} mt={2}>
                    <Text>{"Form Width"}</Text>
                    <Spacer />
                    <select
                      className="dropdown"
                      value={formWidth}
                      onChange={(e) => {
                        setFormWidth(e.target.value);
                      }}
                    >
                      <option value="300px">300px</option>
                      <option value="400px">400px</option>
                      <option value="500px">500px</option>
                      <option value="600px">600px</option>
                    </select>
                  </Flex>
                  <FormField
                    state={heading}
                    setState={setHeading}
                    className={"label-style"}
                    name={"Heading"}
                    id={"heading"}
                    type={"text"}
                  />
                  <FormField
                    state={fileUrl}
                    setState={setFileUrl}
                    className={"label-style"}
                    name={"Logo Image"}
                    id={"file-upload"}
                    type={"file"}
                    setFile={setFile}
                    setFileUrl={setFileUrl}
                  />
                  <FormField
                    state={fntColor}
                    setState={setFntColor}
                    className={"label-style"}
                    name={"Heading Font Color"}
                    id={"ftn-color"}
                    type={"color"}
                  />
                  <FormField
                    state={inputLabelColor}
                    setState={setInputColor}
                    className={"label-style"}
                    name={"Input Label Color"}
                    id={"input-label-color"}
                    type={"color"}
                  />
                  <FormField
                    state={btnColor}
                    setState={setBtnColor}
                    className={"label-style"}
                    name={"Submit Button Color"}
                    id={"btn-color"}
                    type={"color"}
                  />
                  <FormField
                    state={btnFntColor}
                    setState={setBtnFntColor}
                    className={"label-style"}
                    name={"Submit Button Font Color"}
                    id={"btn-Fnt-color"}
                    type={"color"}
                  />
                  {/* Add Customized Font */}
                  <Flex className="sp-between" pl={2.5} mt={2}>
                    <Text>{"Select Font"}</Text>
                    <Spacer />
                    <select
                      className="dropdown"
                      value={selectedFontOne}
                      onChange={(e) => {
                        setSelectedFontOne(e.target.value);
                      }}
                    >
                      {GOOGLE_FONTS.map((f) => {
                        return (
                          <option key={f.family} value={f.family}>
                            {f.family}
                          </option>
                        );
                      })}
                    </select>
                  </Flex>
                  <FormField
                    state={submitButtonText}
                    setState={setSubmitButtonText}
                    className={"label-style"}
                    name={"Submit Button Text"}
                    id={"SubmitButtonText"}
                    type={"text"}
                  />
                  <FormField
                    state={submitButtonUrl}
                    setState={setSubmitButtonUrl}
                    className={"label-style"}
                    name={"Submit Button URL"}
                    id={"submitButtonUrl"}
                    type={"text"}
                  />

                  <FormField
                    state={submittedText}
                    setState={setSubmittedText}
                    className={"label-style"}
                    name={"Success Message Text"}
                    id={"successMessageText"}
                    type={"text"}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="subTitleShape" />
                  <h3 className="subHeading">Frequently used fields:</h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "-webkit-fill-available",
                  }}
                >
                  <ReactSortable
                    list={firstGroup}
                    setList={setFirstGroup}
                    animation={150}
                    group="cards"
                    onChange={(order, sortable, evt) => {}}
                    onEnd={(evt) => {}}
                  >
                    {firstGroup.map((item, key) => (
                      <SortedField
                        type={item.type}
                        key={key}
                        state={item.state}
                        setState={item.setState}
                        name={item.name}
                        id={item.id}
                        required={item.required}
                        onCheckboxClick={(newRequiredState) => {
                          handleCheckboxClick(item.id, newRequiredState);
                        }}
                        showRequired={true}
                        onDefaultValueChange={(newDefaultValue) => {
                          handleDefaultValueChange(item.id, newDefaultValue);
                        }}
                        showSettings={true}
                      />
                    ))}
                  </ReactSortable>

                  {secondGroup
                    .filter((field) => field.fieldType === FIELD_TYPES.CUSTOM)
                    .map((value, key) => {
                      return (
                        <div key={value.id}>
                          {value.show && (
                            <CustomFieldEdit
                              state={secondGroup.filter(
                                (field) =>
                                  field.fieldType === FIELD_TYPES.CUSTOM
                              )}
                              setState={({ action, data }) => {
                                const index = secondGroup.findIndex(
                                  (field) => field.id === data.id
                                );
                                if (index !== -1) {
                                  if (action === "ADD" || action === "UPDATE") {
                                    secondGroup[index] = data;
                                  } else if (action === "DELETE") {
                                    secondGroup.splice(index, 1);
                                  }
                                  setSecondGroup([...secondGroup]);
                                }
                              }}
                              name={value.name}
                              id={value.id}
                              fieldData={value}
                            />
                          )}
                        </div>
                      );
                    })}
                  <AddCustomField
                    setCustomField={(newField) => {
                      setSecondGroup([...secondGroup, newField]);
                    }}
                    customField={secondGroup.filter(
                      (field) => field.fieldType === FIELD_TYPES.CUSTOM
                    )}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="subTitleShape" />
                  <h3 className="subHeading"> Extra options:</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="used-field-container">
                    <div className="sp-between mr-10">
                      <div className="w-25">
                        <label htmlFor="form-heading">
                          Do not show form again once submitted:{" "}
                        </label>
                      </div>
                      <input id="submit-checkbox" type="checkbox" />
                    </div>
                  </div>
                  <div className="used-field-container">
                    <div className="sp-between mr-10">
                      <div className="w-25">
                        <label htmlFor="form-heading">
                          Do not show form again for 7 days once cancelled:{" "}
                        </label>
                      </div>
                      <input id="sevenday-checkbox" type="checkbox" />
                    </div>
                  </div>
                  {/* ///////////////////// */}
                  <div className="used-field-container">
                    <div className="sp-between mr-10">
                      <div className="w-25">
                        <label htmlFor="form-heading">Trigger Send: </label>
                      </div>
                      <input
                        id="sevenday-checkbox"
                        type="checkbox"
                        onChange={(event) => {
                          setIsTriggerSend(event.target.checked);
                        }}
                      />
                    </div>
                  </div>
                  {isTriggerSend && (
                    <>
                      <Flex direction="column" mt={2}>
                        <input
                          value={triggerExternalKey}
                          className="text-field2"
                          placeholder={`Enter Trigger External Key`}
                          onChange={(event) => {
                            setTriggerExternalKey(event.target.value);
                          }}
                        />
                      </Flex>
                    </>
                  )}
                  <div className="used-field-container">
                    <div className="sp-between mr-10">
                      <div className="w-25">
                        <label htmlFor="form-heading">Journey Event: </label>
                      </div>
                      <input
                        type="checkbox"
                        onChange={(event) => {
                          setIsFiredEntryEvent(event.target.checked);
                        }}
                      />
                    </div>
                  </div>
                  {isFiredEntryEvent && (
                    <>
                      <Flex direction="column" mt={2}>
                        <input
                          value={firedEventDefinitionKey}
                          className="text-field2"
                          placeholder={`Enter Fired Event Definition Key`}
                          onChange={(event) => {
                            setFiredEventDefinitionKey(event.target.value);
                          }}
                        />
                      </Flex>
                    </>
                  )}
                  <div className="used-field-container">
                    <div className="sp-between mr-10">
                      <div className="w-25">
                        <label htmlFor="form-heading">
                          Custom Subscriber Key:
                        </label>
                      </div>
                      <input
                        id="customSubscriberKey-checkbox"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>

                <div className="positioning">
                  <Heading size="md">Form Position</Heading>
                  <RadioGroup
                    value={position}
                    onChange={(e) => {
                      setPosition(e);
                    }}
                  >
                    <HStack
                      direction="row"
                      mt={8}
                      justifyContent="center"
                      spacing={14}
                    >
                      <Flex direction="column" align="center">
                        <Image src={formRight} w="110px" height="110px" />
                        <Text
                          fontWeight="bold"
                          mt={2}
                          color={position === "center" ? "red" : "black"}
                        >
                          Center
                        </Text>
                        <Radio value="center" colorScheme="red" mt={2} />
                      </Flex>
                      <Flex direction="column" align="center">
                        <Image src={formRight} w="110px" height="110px" />
                        <Text
                          fontWeight="bold"
                          mt={2}
                          color={position === "right" ? "red" : "black"}
                        >
                          Right
                        </Text>
                        <Radio value="right" mt={2} colorScheme="red" />
                      </Flex>
                      <Flex direction="column" align="center">
                        <Image src={formPage} w="110px" height="110px" />
                        <Text
                          fontWeight="bold"
                          mt={2}
                          color={position === "page" ? "red" : "black"}
                        >
                          In-Page
                        </Text>
                        <Radio value="page" mt={2} colorScheme="red" />
                      </Flex>
                    </HStack>
                  </RadioGroup>
                </div>
                {secondGroup.length === 0 ||
                submitButtonText === "" ||
                heading === "" ? (
                  <button
                    disabled
                    className="submit-btn"
                    style={{ opacity: "0.5" }}
                  >
                    Update Form
                  </button>
                ) : isLoading ? (
                  <button
                    disabled
                    className="submit-btn"
                    style={{ opacity: "0.5" }}
                  >
                    Loading
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="submit-btn"
                    onClick={() => {
                      handleFileUpload();
                    }}
                  >
                    Update Form
                  </button>
                )}
                <span style={{ color: "red" }}>{errorMessage}</span>
              </form>
            </div>
          </section>
        </div>
        <div className="container">
          <div
            style={
              position === "center" || position === "page"
                ? {
                    position: "fixed",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }
                : {}
            }
          >
            <div
              style={
                position === "right"
                  ? {
                      position: "fixed",
                      bottom: "32px",
                      right: "32px",
                    }
                  : {}
              }
            >
              <div style={previewFormStyles}>
                <div className="heading1">
                  <h1>Form Preview</h1>
                </div>
                <section
                  style={{
                    background: bgColor,
                    width: formWidth,
                    transition: "0.4s",
                  }}
                  className="wrapper"
                >
                  <div className="heading">
                    {fileUrl && (
                      <div style={{ position: "absolute" }}>
                        <img
                          style={{
                            height: "4.3em",
                            width: "auto",
                            marginBottom: "16px",
                          }}
                          alt="logo"
                          src={fileUrl}
                        />
                        <div
                          className="close-icon"
                          onClick={() => {
                            setFile(null);
                            setFileUrl(null);
                            document.getElementById("file-upload").value = "";
                          }}
                        >
                          <Close />
                        </div>
                      </div>
                    )}
                    <h1
                      style={{ color: fntColor, textAlign: "center" }}
                      className="text text-large"
                    >
                      {heading}
                    </h1>
                  </div>
                  <form
                    name="signin"
                    className="form"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Flex direction="column">
                      <Text
                        color={inputLabelColor}
                        fontWeight="medium"
                        lineHeight={6}
                        mb={3}
                      >
                        Enter Email{" "}
                      </Text>
                      <input
                        value={email}
                        type="email"
                        className="text-field2"
                        placeholder={`Enter Email *`}
                        id="email-check"
                        draggable={false}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </Flex>
                    <ReactSortable
                      list={secondGroup}
                      setList={(data) => {
                        setSecondGroup(data);
                      }}
                      animation={150}
                      group="cards"
                      onChange={(order, sortable, evt) => {}}
                      onEnd={(evt) => {}}
                    >
                      {secondGroup.map((key, item) => {
                        if (key.name === "Email") {
                          return <></>;
                        } else if (key.type === "number") {
                          return (
                            <Flex direction="column" key={item}>
                              <Text
                                color={inputLabelColor}
                                fontWeight="medium"
                                lineHeight={6}
                                mb={3}
                              >
                                {key?.name}
                              </Text>
                              <input
                                value={key.state}
                                type="number"
                                className="text-field2"
                                placeholder={`Enter ${key.name}`}
                                id={key.idid}
                                draggable={false}
                                onDrag={(e) => {
                                  e.preventDefault();
                                }}
                              />
                            </Flex>
                          );
                        } else if (key.type === "date") {
                          return (
                            <Flex
                              direction="row"
                              style={{ width: "100%" }}
                              mt="8px"
                              key={key}
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Text
                                color={inputLabelColor}
                                fontWeight="medium"
                                lineHeight={6}
                                mb={3}
                              >
                                {key?.name}
                              </Text>
                              <CustomField
                                key={key}
                                state={key?.defaultValue}
                                setState={setCustomField}
                                name={key.name}
                                id={key.id}
                                type={key.type}
                              />
                            </Flex>
                          );
                        } else if (key.type === "dropdown") {
                          return (
                            <Flex direction="column" key={item}>
                              <Text
                                color={inputLabelColor}
                                fontWeight="medium"
                                lineHeight={6}
                                mb={3}
                              >
                                {key?.name}
                              </Text>
                              <Select>
                                {key.options?.map((option, key) => (
                                  <option>{option}</option>
                                ))}
                              </Select>
                            </Flex>
                          );
                        } else if (key.type === "checkbox") {
                          return (
                            <Flex align="center" mb={2}>
                              <Text
                                color={inputLabelColor}
                                mr="5"
                                fontWeight="medium"
                                lineHeight={6}
                              >
                                {key?.name}
                              </Text>
                              <Checkbox />
                            </Flex>
                          );
                        } else if (key.type === "textarea") {
                          return (
                            <Flex direction="column" key={item}>
                              <Text
                                color={inputLabelColor}
                                fontWeight="medium"
                                lineHeight={6}
                                mb={3}
                              >
                                {key?.name}
                              </Text>
                              <Textarea value={key.defaultValue} />
                            </Flex>
                          );
                        } else {
                          return (
                            <Flex direction="column" key={item}>
                              <Text
                                color={inputLabelColor}
                                fontWeight="medium"
                                lineHeight={6}
                                mb={3}
                              >
                                {key?.name}
                              </Text>
                              <SortedField
                                key={item}
                                state={key.defaultValue || key.state}
                                setState={key.setState}
                                name={key.name}
                                id={key.id}
                                required={item.required}
                              />
                            </Flex>
                          );
                        }
                      })}
                    </ReactSortable>

                    <div className="input-control">
                      <button
                        type="submit"
                        style={{
                          background: btnColor,
                          color: btnFntColor,
                          margin: 0,
                          marginTop: "10px",
                          boxShadow: `0 8px 22px 0 ${btnColor}64`,
                        }}
                        className="submit-btn" 
                      >
                        {submitButtonText}
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UpdateForm;
