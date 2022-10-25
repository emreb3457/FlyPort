// import {
//   Box,
//   TableContainer,
//   Thead,
//   Table,
//   Tbody,
//   Td,
//   Tr,
//   Th,
//   Radio,
//   RadioGroup,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import Pagination from "./Pagination";

// const ListTable = ({
//   head,
//   row,
//   page,
//   totalRowCount,
//   changePage,
//   radioSetValue,
//   radioValue,
//   select = false,
//   link = false,
// }) => {
//   return (
//     <Box>
//       <TableContainer width={{ lg: "1050px", "2xl": "100%" }}>
//         <Table variant="simple" size={"md"}>
//           <Thead>
//             <Tr>
//               {select && <Th>#</Th>}
//               {head?.map((x, index) => (
//                 <Th key={index} onClick={() => console.log(x.column)}>
//                   {x.title}
//                 </Th>
//               ))}
//             </Tr>
//           </Thead>
//           <Tbody>
//             {row?.map((x, index) => (
//               <Tr key={index}>
//                 {select ? (
//                   <Td>
//                     <RadioGroup onChange={radioSetValue} value={radioValue}>
//                       <Radio value={JSON.stringify(x)}></Radio>
//                     </RadioGroup>
//                   </Td>
//                 ) : (
//                   <Td>{index + 1}</Td>
//                 )}
//                 {head?.map((m, index) => (
//                   <LinkTd key={index} link={link} data={x.id}>
//                     {x[m.column]}
//                   </LinkTd>
//                 ))}
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </TableContainer>
//       <Pagination
//         page={page}
//         totalRowCount={totalRowCount}
//         changePage={changePage}
//       />
//     </Box>
//   );
// };

// const LinkTd = ({ data, link, children }) => {
//   const navigation = useNavigate();
//   return (
//     <Td
//       cursor={link && "pointer"}
//       onClick={() => link && navigation(data.toString())}
//     >
//       {" "}
//       {children}
//     </Td>
//   );
// };
// export default ListTable;
// Powered by DevExtreme React Components. See https://www.npmjs.com/package/devextreme-react
import React, { useMemo, useState } from "react";

import DataGrid, {
  Column,
  FilterRow,
  Grouping,
  Pager,
  Paging,
  Selection,
  ColumnChooser,
  ColumnFixing,
  StateStoring,
} from "devextreme-react/data-grid";
import { useNavigate } from "react-router-dom";

const ListTable = ({ id, row, head, radioSetValue, selected }) => {
  const tableKey = `${id}_table`;

  const customLoad = () => {
    let state = localStorage.getItem(tableKey);
    return JSON.parse(state);
  };

  const customSave = (state) => {
    localStorage.setItem(tableKey, JSON.stringify(state));
  };

  const TableComp = useMemo(() => {
    return (
      <DataGrid
        dataSource={row}
        keyExpr={"id"}
        allowColumnReordering={true}
        remoteOperations={true}
        columnAutoWidth={true}
        onSelectionChanged={(x) => radioSetValue(x.selectedRowsData[0])}
      >
        <ColumnChooser enabled={true} />
        <StateStoring
          enabled={true}
          type="custom"
          customLoad={customLoad}
          customSave={customSave}
        />
        <ColumnFixing enabled={true} />
        <Grouping autoExpandAll={true} />
        <FilterRow visible={true} />
        <Selection mode={selected ? "multiple" : "single"} />
        {head?.map((data, index) => {
          return index === 0 ? (
            <Column
              key={index}
              allowSorting={false}
              allowFiltering={false}
              allowGrouping={false}
              allowReordering={false}
              width={100}
              caption={data.title}
              dataField={data.column}
            />
          ) : (
            <Column key={index} caption={data.title} dataField={data.column} />
          );
        })}

        <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
    );
  }, [id, row]);

  return <div>{TableComp}</div>;
};
export default React.memo(ListTable);
