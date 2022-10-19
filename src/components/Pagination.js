import { Box, Button } from "@chakra-ui/react";
import React from "react";

const Pagination = ({ changePage, totalRowCount, page }) => {
  const totalPage = Math.ceil(totalRowCount / 10);
  return (
    <Box marginTop={"10px"}>
      <Button
        color={"black"}
        padding={"8px 16px"}
        textDecoration={"none"}
        transition={"background-color .3s"}
        disabled={page === 0 && true}
        onClick={() => changePage((prev) => prev - 1)}
      >
        &laquo;
      </Button>
      {[...Array(totalPage ? totalPage : 1)]?.map((x, i) => (
        <Button
          key={"link_" + i}
          color={page === i ? "red" : "black"}
          padding={"8px 16px"}
          margin={"2px"}
          textDecoration={"none"}
          transition={"background-color .3s"}
          onClick={() => changePage(i)}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        color={"black"}
        padding={"8px 16px"}
        textDecoration={"none"}
        transition={"background-color .3s"}
        disabled={page + 1 === totalPage && true}
        onClick={() => changePage((prev) => prev + 1)}
      >
        &raquo;
      </Button>
    </Box>
  );
};
export default React.memo(Pagination);
