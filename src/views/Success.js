import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Success.css";
import bgImage from "../assets/image_asset.png";
import SuccessAnimation from "../assets/SuccessAnimation.svg";

function Success({ formName }) {
  const params = useParams();
  const header =
    "Please include the below script right before the </body> tag of your website";

  const [code, setCode] = useState(
    `<div id="webform" class="webform-class" data-id="${params.formId}"></div>
        <link href="https://red-hibbert.github.io/index.css" rel="stylesheet" />
        <script src="https://red-hibbert.github.io/index.js"></script>`
  );

  function setCopy() {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        document.getElementById("copy-button").innerText = "Code Copied";
        document.getElementById("copy-button").style.backgroundColor =
          "#f44336";
        document.getElementById("copy-button").style.color = "#ffffff";

        setTimeout(() => {
          document.getElementById("copy-button").innerText =
            "Click to copy code";
          document.getElementById("copy-button").style.backgroundColor =
            "#f4433617";
          document.getElementById("copy-button").style.color = "#f44336";
        }, 2000);
      })
      .catch((error) => {});
  }

  return (
    <div
      className="layout-bg"
      style={{
        background: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto auto",
        height: "calc(100vh - 110px)",
      }}
    >
      <div className="float-container" style={{ marginTop: "214px" }}>
        <img
          src={SuccessAnimation}
          width="100px"
          height="100px"
          className="animate"
        />
        <h1 className="heading-1">🎉 Form Created! 🎉 </h1>
        <p>
          Your form has been created with a data extension named{" "}
          <b>{formName}</b>
        </p>
        <b>{header}</b>
        <div className="coding-block">
          <code>{code}</code>
        </div>
        {navigator.clipboard && (
          <button
            className="red"
            id="copy-button"
            onClick={() => {
              setCopy();
            }}
          >
            Click to copy code
          </button>
        )}
      </div>
      <div className="create-another">
        <p>To create another form, click below </p>
        <Link to={"/"}>
          <button className="submit-btn">Create another form</button>
        </Link>
      </div>
    </div>
  );
}

export default Success;
