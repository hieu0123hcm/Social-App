/* eslint-disable @typescript-eslint/no-explicit-any */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { CustomButton } from "../../components/CustomUI/CustomButton";
import TextFields from "../../components/CustomUI/TextFields";
import { COLORS } from "../../constants/Constant";
import { setLogin } from "../../data/loginSlice";
import { APIResponse } from "../../model/response.model";
import { UserResponse } from "../../model/user.model";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const loginFormSubmit = async (values: ILoginForm, onSubmitProps: any) => {
    //TODO: separate the components into different files  & use Axios
    const loggedInResponse = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const loggedIn: APIResponse<UserResponse> = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn.success === false) {
      setError(loggedIn.message);
      navigate("/");
    } else {
      Cookies.set("token", loggedIn.data.token as string);
      Cookies.set("user", JSON.stringify(loggedIn.data.user));
      dispatch(
        setLogin({ token: loggedIn.data.user, user: loggedIn.data.user })
      );
      setError("");
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
          {error && (
            <Typography color={COLORS.bittersweet} mb={"20px"}>
              {error}
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
            <CustomButton label="Login" type="submit" />
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
