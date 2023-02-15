import { Box, Text, Input, Select } from "@chakra-ui/react";
import { SelectBox } from "devextreme-react";
import DataSource from "devextreme/data/data_source";
import { useMemo } from "react";

export const TextInput = ({
  name,
  value,
  label,
  children,
  bg,
  disabled = false,
  onChange,
  error,
  type,
  defaultValue,
  ...props
}) => {
  return (
    <Box py="10px" fontSize={"18px"} w="100%" minW="150px" {...props}>
      <Text mr="5px" color={"#232F3D"}>
        {children ? children : " "}
      </Text>
      <Input
        h="54px"
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        borderColor={"#D6D6D6"}
        disabled={disabled}
        bg={disabled ? "#D6D6D6" : bg}
        type={type}
        {...props}
      />
      {error && (
        <Text mr="5px" color={"red"} fontSize="12px">
          {error}
        </Text>
      )}
    </Box>
  );
};

export const SelectInput = ({
  name,
  value,
  label,
  children,
  bg,
  disabled = false,
  onChange,
  data,
  visableValue,
  error,
  ...props
}) => {
  return useMemo(() => {
    const datasource = new DataSource({
      store: data,
      paginate: true,
      pageSize: 10,
    });
    return (
      <Box py="10px" fontSize={"18px"} w="100%" minW="150px" {...props}>
        <Text mr="5px" color={"#232F3D"}>
          {children ? children : " "}
        </Text>
        <SelectBox
          name={name}
          dataSource={datasource}
          defaultValue={value}
          displayExpr={visableValue}
          searchEnabled={true}
          searchMode={"contains"}
          searchExpr={visableValue}
          searchTimeout={200}
          minSearchLength={0}
          showDataBeforeSearch={false}
          onValueChanged={(e) =>
            onChange(name, e.value?.id || e.value?.nitelikId)
          }
          height="54px"
          disabled={disabled}
          style={disabled ? { backgroundColor: "#D6D6D6" } : {}}
        />

        {error && (
          <Text mr="5px" color={"red"} fontSize="12px">
            {error}
          </Text>
        )}
      </Box>
    );
  }, [data, disabled, error]);
};

export const DateInput = ({
  name,
  value,
  label,
  children,
  bg,
  disabled = false,
  onChange,
  error,
  ...props
}) => {
  return (
    <Box py="10px" fontSize={"18px"} w="100%" {...props}>
      <Text mr="5px" color={"#232F3D"}>
        {children ? children : " "}
      </Text>
      <Input
        h="54px"
        name={name}
        value={value}
        onChange={onChange}
        borderColor={"#D6D6D6"}
        disabled={disabled}
        bg={disabled ? "#D6D6D6" : bg}
        type="date"
        {...props}
      />
      {error && (
        <Text mr="5px" color={"red"} fontSize="12px">
          {error}
        </Text>
      )}
    </Box>
  );
};

export const DefaultSelect = ({
  name,
  value,
  label,
  children,
  bg,
  disabled = false,
  onChange,
  data,
  visableValue,
  error,
  ...props
}) => {
  return (
    <Box py="10px" fontSize={"18px"} w="100%" {...props}>
      <Text mr="5px" color={"#232F3D"}>
        {children ? children : " "}
      </Text>
      <Select
        name={name}
        onChange={onChange}
        data={data}
        h="54px"
        borderColor={"#D6D6D6"}
        disabled={disabled}
        bg={disabled ? "#D6D6D6" : bg}
        defaultValue={value}
      >
        <option value={"default"}>Seçiniz</option>
        {data?.map((x) => {
          return (
            <option key={x.id} value={x?.id || x?.nitelikId}>
              {x[visableValue]}
            </option>
          );
        })}
      </Select>
      {error && (
        <Text mr="5px" color={"red"} fontSize="12px">
          {error}
        </Text>
      )}
    </Box>
  );
};
