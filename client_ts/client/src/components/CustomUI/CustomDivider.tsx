import { Divider, Typography } from "@mui/material";

const CustomDivider = ({ LeadingText }: { LeadingText: string }) => {
  return (
    <Divider textAlign="left" sx={{ width: "100%" }}>
      <Typography fontSize={"18px"} marginTop={"10px"} fontWeight={"bold"}>
        {LeadingText}
      </Typography>
    </Divider>
  );
};

export default CustomDivider;
