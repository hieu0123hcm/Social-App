import { Button, useTheme } from "@mui/material";

interface IProps {
  handleClick?: () => void;
  label: string;
  type?: "button" | "submit" | "reset";
  startIcon?: React.ReactNode;
  disabled?: boolean;
}
export const CustomButton = ({
  handleClick,
  label,
  type,
  startIcon,
  disabled,
}: IProps) => {
  const theme = useTheme();
  return (
    <Button
      type={type}
      onClick={handleClick}
      variant="outlined"
      size="small"
      startIcon={startIcon}
      disabled={disabled}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.7s",
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: `solid 1px ${theme.palette.primary.contrastText}`,
        "&:hover": {
          bgcolor: theme.palette.primary.light,
          border: `solid 1px ${theme.palette.primary.contrastText}`,
        },
        textTransform: "capitalize",
      }}
    >
      {label}
    </Button>
  );
};
