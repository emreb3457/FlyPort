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
import Pagination from "../../Pagination";

const ListTable = ({
  head,
  dataHead,
  row,
  page,
  totalRowCount,
  changePage,
  select = false,
  link = false,
}) => {
  return (
    <Box>
      <TableContainer width={{ lg: "1050px", "2xl": "100%" }}>
        <Table variant="simple" size={"md"}>
          <Thead>
            <Tr>
              {head?.map((x) => (
                <Th key={x}>{x}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {row?.map((x, index) => (
              <Tr key={index}>
                {select ? (
                  <Td>
                    <RadioGroup>
                      <Radio value={`${index}`}></Radio>
                    </RadioGroup>
                  </Td>
                ) : (
                  <Td>{index + 1}</Td>
                )}
                {dataHead?.map((m) => (
                  <LinkTd key={m} link={link} data={x.id}>
                    {x[m]}
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
    <Td cursor={link && "pointer"} onClick={() => link && navigation(data[1])}>
      {" "}
      {children}
    </Td>
  );
};
export default ListTable;
