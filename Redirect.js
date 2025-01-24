/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ClientId, ClientSecret, onlySubdomain } from "../functions/Sfmc";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Redirect({ setFormName }) {
  let navigate = useNavigate();
  const [message, setMessage] = useState("Creating Form...");

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
      client_id: customClientId ? customClientId : ClientId,
      client_secret: customClientSecret ? customClientSecret : ClientSecret,
      redirect_uri:
        "https://56f0-2400-adc5-458-4800-326b-918d-98ca-6d32.ngrok-free.app/redirect",
      code: code,
    };

    const formMetaData = JSON.parse(
      window.localStorage.getItem("formMetaData")
    );
    const formFields = JSON.parse(localStorage.getItem("formArray"));

    const requestBody = {
      fields: formFields,
      metaData: formMetaData,
      reqBody: body,
      clientId: customClientId ? customClientId : ClientId,
      subdomain: customSubdomain ? customSubdomain : tssd,
      clientSecret: customClientSecret ? customClientSecret : ClientSecret,
    };

    axios
      .post("https://rhgwebform.herokuapp.com/v1/form", requestBody)
      .then((res) => {
        const data = res.data.data.id;
        setFormName(res.data.data.customerName);
        navigate("/success/" + data);
      })
      .catch((err) => {
        console.error(err);
        // setMessage('An error has occured, please try again later');
      });
  }

  useEffect(() => {
    const url = window.location.href;
    var code;
    if (url.match(/code=([^&]+)/)) {
      code = url.match(/code=([^&]+)/)[1];
      getAuthToken(code);
    } else {
      // setMessage('An error has occured, please try again later');
    }
  }, []);

  return (
    <div className="creating">
      <div className="spinner">
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
