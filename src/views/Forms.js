import React, { useEffect, useState } from "react";
import axios from "axios";
import FormsList from "../components/template-components/FormLIst";
import { Box, Select, Button, Heading } from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import { API_URL } from '../config';

function Forms() {
  const [formsList, setFormsList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [eid, setEid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function fetchForms(eid) {
    try {
      setLoading(true);
      const requestBody = {
        eid,
        pageSize,
        pageNumber,
      };
      const response = await axios.post(
        `${API_URL}/v1/form/get-all`,
        requestBody
      );
      const data = response.data.formsList;
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  useEffect(() => {
    const url = decodeURI(window.location.href);
    var auth;
    if (url.match(/code=([^&]+)/)) {
      auth = url.match(/code=([^&]+)/)[1];
      const decode = jwtDecode(auth);
      const eidInAuth = decode.eid;
      setEid(eidInAuth);
    } else {
      if (url.match(/error=([^&]+)/)) {
        console.log("url not matched");
      }
    }
  }, []);

  useEffect(() => {
    if (eid) {
      fetchForms(eid)
        .then((formsData) => {
          setFormsList(formsData);
          if (formsList.length === 0) {
            setErrorMessage("No records to show");
          }
        })
        .catch((error) => {
          console.error("Error in fetchData:", error);
        });
    }
  }, [eid, pageNumber, pageSize]);

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
  };

  const handleMoreClick = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {" "}
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
        ) : formsList.length > 0 ? (
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
            <FormsList formsList={formsList} />

            <Button mt={4} mb={4} variant="outline" onClick={handleMoreClick}>
              More
            </Button>
          </>
        ) : (
          <h4 className="error-message">{errorMessage}</h4>
        )}
      </div>
    </Box>
  );
}

export default Forms;
