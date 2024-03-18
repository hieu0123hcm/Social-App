import { Stack, Typography } from "@mui/material";
import React from "react";

const IconText = ({ ICON, text }: { ICON: React.ReactNode; text: string }) => {
  return (
    <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
      {ICON}
      <Typography fontSize={"12px"}>{`${text}`}</Typography>
    </Stack>
  );
};

export default IconText;
