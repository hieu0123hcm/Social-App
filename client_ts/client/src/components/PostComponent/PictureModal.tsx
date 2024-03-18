import CloseIcon from "@mui/icons-material/Close";
import { Box, Grow, useTheme } from "@mui/material";

interface Props {
  onClose: () => void;
  item: string | null;
  isOpening: boolean;
}

const PictureModal = ({ onClose, item, isOpening }: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1,
        left: "0",
        top: "60px",
        width: "100%",
        height: "calc(100vh - 60px)",
        backgroundColor: "rgba(146, 146, 146,0.6)",
        display: "flex",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <CloseIcon
        sx={{
          position: "absolute",
          top: "25px",
          right: "25px",
          cursor: "pointer",
        }}
        onClick={() => {
          onClose();
        }}
      />

      <Grow
        style={{ transformOrigin: "0 0 0" }}
        {...(isOpening ? { timeout: 300 } : {})}
        in={isOpening}
        mountOnEnter
        unmountOnExit
      >
        <Box
          height={"80vh"}
          width={"80vw"}
          sx={{
            [theme.breakpoints.down("md")]: {
              width: "95vw",
              height: "95vh",
            },
          }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box>
            <img
              width="100%"
              height="100%"
              style={{
                borderRadius: "0.4rem",
              }}
              src={`http://localhost:5000/post-images/${item}`}
              srcSet={`http://localhost:5000/post-images/${item}`}
              loading="lazy"
            />
          </Box>
        </Box>
      </Grow>
    </Box>
  );
};

export default PictureModal;
