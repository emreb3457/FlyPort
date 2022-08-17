import { TableContainer, Thead, Table, Tbody, Td, Tr, Th, Radio, RadioGroup, Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const ListTable = ({ head, row, select = false, link = false }) => {

    return (
        <TableContainer w="100%">
            <Table variant="simple" size={"md"}>
                <Thead>
                    <Tr>
                        {head?.map(x =>
                            <Th key={x}>{x}</Th>
                        )}
                    </Tr>
                </Thead>
                <Tbody>
                    {row?.map((x, index) =>
                        <Tr key={index} >
                            {select ? <Td >
                                <RadioGroup >
                                    <Radio value={`${index}`}></Radio>
                                </RadioGroup>
                            </Td> :
                                <Td>{index + 1}</Td>
                            }

                            <LinkTd link={link} data={x}>{x[1]}</LinkTd>
                            <LinkTd link={link} data={x}>{x[2]}</LinkTd>
                            <LinkTd link={link} data={x}>{x[3]}</LinkTd>
                            <LinkTd link={link} data={x}>{x[4]}</LinkTd>
                            <LinkTd link={link} data={x}>{x[5]}</LinkTd>
                            <LinkTd link={link} data={x}>{x[6]}</LinkTd>
                            <LinkTd link={link} data={x}>{x[7]}</LinkTd>
                            <LinkTd link={link} data={x}>{x[8]}</LinkTd>
                            <LinkTd link={link} data={x}>{x[9]}</LinkTd>
                            <LinkTd link={link} data={x}>{x[10]}</LinkTd>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </TableContainer >
    )
}
const LinkTd = ({ data, link, children }) => {
    const navigation = useNavigate();
    return (
        <Td cursor={link && "pointer"} onClick={() => link && navigation(data[1])}> {children}</Td >
    )
}
export default ListTable