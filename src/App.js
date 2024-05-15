import React, { useState, useEffect } from 'react';
import {
 Heading, Flex, Select, Button, ChakraProvider, Table, Thead, Tbody, Tr, Th, Td, Box, IconButton
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import axios from 'axios';

const App = () => {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [branches, setBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const recordsPerPage = 10;

  // Fetch banks data on component mount
  useEffect(() => {
    axios.get('https://bank-search-api.vercel.app/banks')
      .then(response => {
        setBanks(response.data);
      })
      .catch(error => {
        console.error('Error fetching banks:', error);
      });
  }, []);

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  const handleSearch = () => {
    if (selectedBank) {
      setLoading(true);
      axios.get(`https://bank-search-api.vercel.app/branches/${selectedBank}`)
        .then(response => {
          setBranches(response.data);
          setCurrentPage(1); // Reset to first page on new search
        })
        .catch(error => {
          console.error('Error fetching branches:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(branches.length / recordsPerPage)));
  };

  // Calculate the records to display on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = branches.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <ChakraProvider>
      <Flex direction="column" alignItems="center" justifyContent="top" height="auto" marginTop="50px">
      <Heading as='h3' size='xl' noOfLines={1} marginBottom="10px">
    Bank Search
  </Heading>
        <Select
          placeholder="Select Bank"
          width="650px"
          marginBottom={4}
          onChange={handleBankChange}
        >
          {banks.map(bank => (
            <option key={bank.id} value={bank.id}>
              {bank.name}
            </option>
          ))}
        </Select>
        <Button colorScheme="blue" onClick={handleSearch} marginBottom={4} isLoading={loading}>
          Search
        </Button>
      
          <>
            {branches.length > 0 && (
              <Box width="900px" overflowX="auto" border='1px' borderColor='gray.200' marginTop="10px">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Bank Name</Th>
                      <Th>IFSC</Th>
                      <Th>Bank ID</Th>
                      <Th>Branch</Th>
                      <Th>State</Th>
                      <Th>City</Th>
                      <Th>District</Th>
                      <Th>Address</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentRecords.map(branch => (
                      
                      <Tr key={branch.ifsc}>
                        <Td>{branch.bank_name}</Td>
                        <Td>{branch.ifsc}</Td>
                        <Td>{branch.bank_id}</Td>
                        <Td>{branch.branch}</Td>
                        <Td>{branch.state}</Td>
                        <Td>{branch.city}</Td>
                        <Td>{branch.district}</Td>
                        <Td>{branch.address}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
            {branches.length > recordsPerPage && (
              <Flex justifyContent="space-between" width="650px" mt={4}>
                <IconButton
                  icon={<ChevronLeftIcon />}
                  onClick={handlePreviousPage}
                  isDisabled={currentPage === 1}
                  aria-label="Previous Page"
                />
                <IconButton
                  icon={<ChevronRightIcon />}
                  onClick={handleNextPage}
                  isDisabled={currentPage === Math.ceil(branches.length / recordsPerPage)}
                  aria-label="Next Page"
                />
              </Flex>
            )}
          </>
        
      </Flex>
    </ChakraProvider>
  );
};

export default App;
