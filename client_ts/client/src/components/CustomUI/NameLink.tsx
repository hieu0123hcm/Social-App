import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  userId: string;
  name: string;
}

const NameLink = ({ userId, name }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile/" + userId);
  };

  return (
    <Box sx={{ cursor: "pointer" }} onClick={handleClick}>
      <Typography
        component={"div"}
        color={"black"}
        fontSize={"16px"}
        fontWeight={"600"}
        textTransform={"capitalize"}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default NameLink;
