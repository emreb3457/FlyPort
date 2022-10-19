import {
  Box,
  TableContainer,
  Thead,
  Table,
  Tbody,
  Td,
  Tr,
  Th,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const ListTable = ({
  head,
  row,
  page,
  totalRowCount,
  changePage,
  radioSetValue,
  radioValue,
  select = false,
  link = false,
}) => {
  return (
    <Box>
      <TableContainer width={{ lg: "1050px", "2xl": "100%" }}>
        <Table variant="simple" size={"md"}>
          <Thead>
            <Tr>
              {select && <Th>#</Th>}
              {head?.map((x, index) => (
                <Th key={index} onClick={() => console.log(x.column)}>
                  {x.title}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {row?.map((x, index) => (
              <Tr key={index}>
                {select ? (
                  <Td>
                    <RadioGroup onChange={radioSetValue} value={radioValue}>
                      <Radio value={JSON.stringify(x)}></Radio>
                    </RadioGroup>
                  </Td>
                ) : (
                  <Td>{index + 1}</Td>
                )}
                {head?.map((m, index) => (
                  <LinkTd key={index} link={link} data={x.id}>
                    {x[m.column]}
                  </LinkTd>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        totalRowCount={totalRowCount}
        changePage={changePage}
      />
    </Box>
  );
};

const LinkTd = ({ data, link, children }) => {
  const navigation = useNavigate();
  return (
    <Td
      cursor={link && "pointer"}
      onClick={() => link && navigation(data.toString())}
    >
      {" "}
      {children}
    </Td>
  );
};
export default ListTable;
