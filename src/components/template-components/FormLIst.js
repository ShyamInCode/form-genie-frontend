import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const FormsList = ({ formsList }) => {
  useEffect(() => {
    localStorage.setItem("pageNumber", 1);
  }, []);
  const navigate = useNavigate();

  return (
    <div style={{ width: "90%", margin: "0 5%", zIndex: 90 }}>
      <Table variant="stripped" colorScheme="grey0.200" size="sm">
        <Thead bg="gray.200">
          <Tr>
            <Th>ID</Th>

            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {formsList.map((data) => (
            <Tr key={data.id}>
              <Td>{data.id}</Td>
              <Td>
                <Flex>
                  {" "}
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/update/" + data.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    ml={2}
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.setItem(
                        "dataExtensionKey",
                        data.data.dataExtensionRef
                      );

                      navigate("/get-auth-code-for-data-extension-record");
                    }}
                  >
                    View Records
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default FormsList;
