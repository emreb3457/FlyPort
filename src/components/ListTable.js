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

const ListTable = ({
  id,
  row,
  head,
  radioSetValue,
  selected,
  detailFunction,
}) => {
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
        allowColumnResizing={true}
        columnResizingMode={"widget"}
        allowColumnReordering={true}
        remoteOperations={true}
        columnAutoWidth={true}
        onSelectionChanged={(x) => radioSetValue(x.selectedRowsData[0])}
        onRowDblClick={detailFunction}
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
              cellRender={data.render}
              align="center"
            />
          ) : (
            <Column
              key={index}
              caption={data.title}
              dataField={data.column}
              cellRender={data.render}
            />
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
