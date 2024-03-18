import { Box } from "@mui/material";

interface IProps {
  message: string | undefined;
}

const Error = ({ message }: IProps) => {
  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        marginY: "5px",
      }}
    >
      {message}
    </Box>
  );
};

export default Error;
