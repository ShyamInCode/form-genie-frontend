import React, { useState, useEffect } from "react";
import { ClientId, ClientSecret, onlySubdomain } from "../functions/Sfmc";
import { Box, Heading, Select, Button } from "@chakra-ui/react";
import "../App.css";
import axios from "axios";
import DataExtensionRecordList from "../components/template-components/DataExtensionRecordList";
import { API_URL } from '../config';

function DataExtensionRecords() {
  const baseUrl = API_URL;
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function getDataExtensionRecord(code, key) {
    try {
      setLoading(true);

      const url = window.location.href;
      const domain = url.match(/https?:\/\/(.*?)\.app/);

      const body = {
        grant_type: "authorization_code",
        client_id: ClientId,
        client_secret: ClientSecret,
        redirect_uri: `${domain[0]}/extension-record/redirect`,
        code: code,
      };

      const requestBody = {
        reqBody: body,
        clientId: ClientId,
        subdomain: onlySubdomain,
        clientSecret: ClientSecret,
        dataExtensionKey: key,
        pageNumber: parseInt(localStorage.getItem("pageNumber")) || 1,
        pageSize: parseInt(localStorage.getItem("pageSize")) || 5,
      };

      const records = await axios.post(
        `${baseUrl}/v1/form/userdata/data-extension-record`,
        requestBody
      );

      setItems(records.data.dataExtensionRecord.slicedData);
      setLoading(false);

      if (items.length === 0) {
        setErrorMessage("No records to show");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  useEffect(() => {
    const url = decodeURI(window.location.href);
    var code, key;
    if (url.match(/code=([^&]+)/)) {
      code = url.match(/code=([^&]+)/)[1];
      key = localStorage.getItem("dataExtensionKey");
      getDataExtensionRecord(code, key).catch((error) => {
        console.error("Error in API calls: ", error);
      });
    } else {
      if (url.match(/error=([^&]+)/)) {
        console.log("url not matched");
      }
    }
  }, []);

  useEffect(() => {
    if (pageNumber !== 1) {
      localStorage.setItem("pageNumber", pageNumber);
      localStorage.setItem("pageSize", pageSize);
      window.open(
        window.location.origin + "/get-auth-code-for-data-extension-record",
        "_self"
      );
    }
  }, [pageNumber, pageSize]);

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
  };

  const handleMoreClick = () => {
    setPageNumber(pageNumber + 1);
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ marginLeft: "5%" }}
      >
        <div style={{ marginTop: "120px" }}>
          {loading ? (
            <>
              <div className="spinner" style={{ marginTop: "104px" }}>
                <div class="slds-spinner_container">
                  <div role="status" class="slds-spinner slds-spinner_large">
                    <span class="slds-assistive-text"></span>
                    <div class="slds-spinner__dot-a"></div>
                    <div class="slds-spinner__dot-b"></div>
                  </div>
                </div>
              </div>
              <Heading mt={4}>Loading...</Heading>
            </>
          ) : items.length > 0 ? (
            <>
              <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                width="100px"
                paddingRight="24px"
                mb={4}
              >
                {[5, 10, 15, 20, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
              <DataExtensionRecordList data={items} />{" "}
              <Button mt={4} variant="outline" onClick={handleMoreClick}>
                More
              </Button>
            </>
          ) : (
            <h4 className="error-message">{errorMessage}</h4>
          )}
        </div>
      </Box>
    </>
  );
}

export default DataExtensionRecords;
