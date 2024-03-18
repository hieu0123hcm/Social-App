import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useState } from "react";

interface Props {
  handleClick: () => void;
}

const MyIconButton = ({ handleClick }: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <div style={{ marginRight: "8px" }}>
      <Fab
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        size="small"
        color="secondary"
        aria-label="add"
        sx={{
          "&:hover": {
            border: "2px solid green", // Add your desired hover effect
            width: "auto", // Expand the button width
          },
        }}
      >
        {hover ? "CREATE ITEM" : <AddIcon />}
      </Fab>
    </div>
  );
};

export default MyIconButton;
