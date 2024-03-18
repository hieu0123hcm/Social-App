import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  useTheme,
} from "@mui/material";
import { FormikErrors } from "formik";

interface Props {
  label: string;
  values: string;
  name: string;
  errors: FormikErrors<string>;
  touched: boolean;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  endAdornment?: JSX.Element;
  type?: string;
}

const TextFields = ({
  label,
  name,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  endAdornment,
  type,
}: Props) => {
  const theme = useTheme();

  return (
    <FormControl variant="standard">
      <InputLabel htmlFor="component-helper">{label}</InputLabel>
      <Input
        id="filled-error"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values}
        name={name}
        endAdornment={endAdornment}
        type={type}
      />
      {touched && errors && (
        <FormHelperText sx={{ color: theme.palette.error.main }}>
          {errors}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextFields;
