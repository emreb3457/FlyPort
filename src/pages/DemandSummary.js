import { Box, Text } from "@chakra-ui/react"
const DemandSummary = () => {

    return (
        <Box>
            <Label label={"Talep No "} borderTop="1px solid #707070"></Label>
            <Label label={"Talep No "}></Label>
            <Label label={"Talep No "}></Label>
            <Label label={"Talep No "}></Label>
            <Label label={"Talep No "}></Label>
            <Label label={"Talep No "}></Label>
            <Label label={"Talep No "}></Label>
            <Label label={"Talep No "}></Label>
            
        </Box>
    )
}
const Label = ({ label, children, ...props }) => {
    return (
        <Box borderBottom={"1px solid #707070"} py="12px" {...props}>
            <Text>{label}</Text><Text>{children}</Text>
        </Box>
    )
}
export default DemandSummary