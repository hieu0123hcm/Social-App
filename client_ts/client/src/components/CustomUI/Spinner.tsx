import { Box, CircularProgress } from "@mui/material";
import { COLORS } from "../../constants/Constant";

const Spinner = () => {
  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        marginY: "5px",
      }}
    >
      <CircularProgress sx={{ color: COLORS.lime }} size={"15px"} />
    </Box>
  );
};

export default Spinner;
