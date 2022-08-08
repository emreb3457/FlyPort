import { TableContainer, Thead, Table, Tbody, Td, Tr, Th, Radio, RadioGroup } from "@chakra-ui/react"

const ListTable = ({ head, row, select = false }) => {

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
                        <Tr key={index}>
                            {select ? <Td>
                                <RadioGroup >
                                    <Radio value={`${index}`}></Radio>
                                </RadioGroup>
                            </Td> :
                                <Td>{index + 1}</Td>}

                            <Td>{x[1]}</Td>
                            <Td>{x[2]}</Td>
                            <Td>{x[3]}</Td>
                            <Td>{x[4]}</Td>
                            <Td>{x[5]}</Td>
                            <Td>{x[6]}</Td>
                            <Td>{x[7]}</Td>
                            <Td>{x[8]}</Td>
                            <Td>{x[9]}</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </TableContainer >
    )
}
export default ListTable