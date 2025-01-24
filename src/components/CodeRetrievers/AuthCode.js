import React, { useEffect } from "react";
import { ClientId, Subdomain } from "../../functions/Sfmc";
import { Spinner, Heading, Box } from "@chakra-ui/react";

function AuthCode({ route }) {
  useEffect(() => {
    window.open(
      `${Subdomain}v2/authorize?response_type=code&client_id=${ClientId}&redirect_uri=${window.location.origin}/${route}/redirect`,
      "_self"
    );
  }, []);

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <div className="spinner" style={{ marginTop: "104px" }}>
          <div class="slds-spinner_container">
            <div role="status" class="slds-spinner slds-spinner_large">
              <span class="slds-assistive-text"></span>
              <div class="slds-spinner__dot-a"></div>
              <div class="slds-spinner__dot-b"></div>
            </div>
          </div>
        </div>
        <Heading mt={4}>Authorizing...</Heading>
      </Box>
    </div>
  );
}

export default AuthCode;
