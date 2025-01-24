import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";

const DataExtensionRecordList = ({ data }) => {
  const attributes = Array.from(
    new Set(data.flatMap((item) => Object.keys(item.values)))
  );

  return (
    <>
      <Box>
        <Table
          variant="stripped"
          colorScheme="grey0.200"
          size="sm"
          maxH="400px"
          overflowY="scroll"
          overflowX="scroll"
        >
          <Thead>
            <Tr bg="gray.200">
              <Th>Key</Th>
              {attributes.map((attribute) => (
                <Th
                  key={attribute}
                  maxW="200px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {attribute}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>{item.keys.email || "N/A"}</Td>
                {attributes.map((attribute) => (
                  <Td
                    key={attribute}
                    maxW="200px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {item.values[attribute] || "N/A"}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default DataExtensionRecordList;
