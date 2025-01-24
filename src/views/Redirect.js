/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ClientId, ClientSecret, onlySubdomain } from "../functions/Sfmc";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../config';

// Replace hardcoded URL with config
const baseUrl = API_URL;

function Redirect({ setFormName, update }) {
  let apiEndoint, redirect;
  apiEndoint = update ? "/v1/form/update" : "/v1/form";
  redirect = update ? "form/update/redirect" : "redirect";
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  if (message.length === 0) {
    update ? setMessage("Updating Form...") : setMessage("Creating Form...");
  }

  const [customClientId, setCustomClientId] = useState(
    window.localStorage.getItem("customCid")
  );
  const [customClientSecret, setCustomClientSecret] = useState(
    window.localStorage.getItem("customCSec")
  );
  const [customSubdomain, setSubdomain] = useState(
    window.localStorage.getItem("customSubd")
  );

  async function getAuthToken(code) {
    const url = window.location.href;
    var tssd = url.match(/tssd=([^&]+)/)
      ? url.match(/tssd=([^&]+)/)[1]
      : onlySubdomain;

    const body = {
      grant_type: "authorization_code",
      client_id: ClientId,
      client_secret: ClientSecret,
      redirect_uri: window.location.origin + "/" + redirect,
      code: code,
    };

    const formMetaData = JSON.parse(
      window.localStorage.getItem("formMetaData")
    );
    const formFields = JSON.parse(localStorage.getItem("formArray"));
    const { triggerSend, fireEntryEvent } = formMetaData;
    //delete  formMetaData.triggerSend
    //delete  formMetaData.fireEntryEvent
    const requestBody = {
      fields: formFields,
      metaData: formMetaData,
      reqBody: body,
      clientId: ClientId,
      subdomain: onlySubdomain ? onlySubdomain : tssd,
      clientSecret: ClientSecret,
    };

    if (update) requestBody.id = localStorage.getItem("uuid");

    axios
      .post(baseUrl + apiEndoint, requestBody)
      .then(async (res) => {
        const data = res.data.data.id;
        setFormName(res.data.data.customerName);
        await Promise.all([
          postFireEntryEvent(
            fireEntryEvent,
            requestBody.subdomain,
            res.data.data.accessToken
          ),
          postTriggerSend(
            triggerSend,
            requestBody.subdomain,
            res.data.data.accessToken
          ),
        ]);
        navigate("/success/" + data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const postTriggerSend = async (triggerSend, subdomain, accessToken) => {
    try {
      if (triggerSend?.state) {
        const requestBody = {
          email: triggerSend.email,
          externalKey: triggerSend.externalKey,
          subdomain,
          accessToken,
        };
        const res = await axios.post(baseUrl + apiEndoint, requestBody);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const postFireEntryEvent = async (fireEntryEvent, subdomain, accessToken) => {
    try {
      if (fireEntryEvent?.state) {
        const requestBody = {
          email: fireEntryEvent.email,
          EventDefinitionKey: fireEntryEvent.EventDefinitionKey,
          subdomain,
          accessToken,
        };
        const res = await axios.post(baseUrl + apiEndoint, requestBody);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const url = decodeURI(window.location.href);
    var code;
    if (url.match(/code=([^&]+)/)) {
      code = url.match(/code=([^&]+)/)[1];
      getAuthToken(code);
    } else {
      if (url.match(/error=([^&]+)/)) {
        setMessage(
          "An error has occured:" + url.match(/error_description=([^&]+)/)[1]
        );
      }
    }
  }, []);

  return (
    <div className="creating">
      <div className="spinner" style={{ marginTop: "104px" }}>
        <div class="slds-spinner_container">
          <div role="status" class="slds-spinner slds-spinner_large">
            <span class="slds-assistive-text"></span>
            <div class="slds-spinner__dot-a"></div>
            <div class="slds-spinner__dot-b"></div>
          </div>
        </div>
      </div>
      {/* <div className='loader' /> */}
      <span>{message}</span>
    </div>
  );
}

export default Redirect;
