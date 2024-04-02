import { Box, CircularProgress, useTheme } from "@mui/material";

const Spinner = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        marginY: "5px",
        overflow: "hidden",
      }}
    >
      <>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.palette.primary.light} />
              <stop offset="100%" stopColor={theme.palette.primary.main} />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{
            "svg circle": { stroke: "url(#my_gradient)" },
          }}
        />
      </>
    </Box>
  );
};

export default Spinner;
