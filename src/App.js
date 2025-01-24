/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";
import Template from "./views/Template";
import "./App.css";
import { DesignYourOwnView } from "./views/DesignYourOwnView";
import { Choose } from "./views/Choose";
import Success from "./views/Success";
import { Fragment, useState } from "react";
import Redirect from "./views/Redirect";
import AuthCode from "./components/CodeRetrievers/AuthCode";
import DataExtensionRecords from "./views/DataExtensionRecords";
import Navbar from "./components/Navbar";
import Forms from "./views/Forms";
import UpdateForm from "./views/UpdateForm";

function App() {
  const [formName, setFormName] = useState();
  const all_pages = useRoutes([
    {
      path: "/",
      element: <Template setFormName={setFormName} />,
    },
    {
      path: "/update/:formId",
      element: <UpdateForm />,
    },
    {
      path: "success/:formId",
      element: <Success formName={formName} />,
    },
    {
      path: "redirect",
      element: <Redirect setFormName={setFormName} />,
    },
    {
      path: "get-auth-code-for-data-extension-record",
      element: <AuthCode route="extension-record" />,
    },
    {
      path: "get-auth-code-for-forms",
      element: <AuthCode route="forms" />,
    },
    {
      path: "forms/redirect",
      element: <Forms />,
    },
    {
      path: "form/update/redirect",
      element: <Redirect setFormName={setFormName} update={true} />,
    },
    {
      path: "extension-record/redirect",
      element: <DataExtensionRecords />,
    },
  ]);

  return (
    <Fragment>
      <header
        className="navbar"
        style={{
          padding: "20px",
          position: "fixed",
          width: "100vw",
          backgroundColor: "white",
          zIndex: 100,
        }}
      >
        <img
          style={{ height: "4em", width: "auto" }}
          alt="logo"
          src="https://uploads-ssl.webflow.com/638f829dc7f24f9afd323653/63ac86885f0e59372ff9f66a_WEBFORM_LOGO.png"
        />
      </header>
      <Navbar />
      {all_pages}
    </Fragment>
  );
}

export default App;
