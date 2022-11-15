import { Box, Text, Input, Select } from "@chakra-ui/react";
import { SelectBox } from "devextreme-react";

export const TextInput = ({
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
  return (
    <Box py="10px" fontSize={"18px"} w="100%" {...props}>
      <Text mr="5px" color={"#232F3D"}>
        {children ? children : " "}
      </Text>
      {/* <SelectBox
        name={name}
        dataSource={data}
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
        onValueChange={() => console.log("a")}
        style={{}}
      /> */}
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
