import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../constants/Constant";

const CustomAvatar = ({
  userId,
  picturePath,
}: {
  userId: string;
  picturePath: string;
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Avatar
      sx={{
        cursor: "pointer",
        width: "32px",
        height: "32px",
        border: `1px solid ${COLORS.black}`,
      }}
      onClick={handleClick}
      alt="User Avatar"
      src={`http://localhost:5000/post-images/${picturePath}`}
    />
  );
};

export default CustomAvatar;
