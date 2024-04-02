/* eslint-disable @typescript-eslint/no-explicit-any */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import TextFields from "../../components/CustomUI/TextFields";
import { COLORS } from "../../constants/Constant";
import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hook/useReduxHooks";
import { login } from "../../redux/data/authSlice";

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

interface ILoginForm {
  username: string;
  password: string;
}

const initialValuesLogin: ILoginForm = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginError = useAppSelector((state) => state.auth.authError);
  const loginLoading = useAppSelector((state) => state.auth.authLoading.login);
  const message = useAppSelector((state) => state.auth.message);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const loginFormSubmit = async (values: ILoginForm, onSubmitProps: any) => {
    dispatch(login(values));
    onSubmitProps.resetForm();
    if (loginError) {
      navigate("/");
    } else {
      navigate("/home");
    }
  };

  return (
    <Formik
      onSubmit={loginFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          {loginError && (
            <Typography color={COLORS.bittersweet} mb={"20px"}>
              {message}
            </Typography>
          )}
          <Stack gap={"25px"}>
            <TextFields
              label="Username"
              name="username"
              values={values.username}
              errors={errors.username!}
              touched={touched.username!}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <TextFields
              label="Password"
              name="password"
              values={values.password}
              errors={errors.password!}
              touched={touched.password!}
              handleChange={handleChange}
              handleBlur={handleBlur}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button variant="contained" disabled={loginLoading} type="submit">
              {loginLoading ? "Loading..." : "Login"}
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
