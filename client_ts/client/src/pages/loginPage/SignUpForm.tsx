/* eslint-disable @typescript-eslint/no-explicit-any */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import TextFields from "../../components/CustomUI/TextFields";
import Dropzone from "../../components/Dropzone/Dropzone";
import { setLogin } from "../../redux/data/authSlice";
import { User } from "../../model/user.model";
import { register } from "../../utils/api/register";

const signupSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Your password is too short.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please re-enter your password"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
});

interface ISignupForm extends Omit<User, "_id" | "followers" | "following"> {
  password: string;
  picture: File[];
  confirmPassword: string;
}

const initialValuesSignUp: ISignupForm = {
  firstName: "",
  lastName: "",
  username: "",
  bio: "",
  email: "",
  password: "",
  confirmPassword: "",
  picturePath: "",
  location: "",
  occupation: "",
  picture: [],
  gender: "Male",
};

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [image, setImage] = useState<File[]>([]);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showRePassword, setShowRePassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const signupFormSubmit = async (values: ISignupForm) => {
    console.log(values);
    const signedUp = await register({ values, picture: image });
    console.log(signedUp);
    if (signedUp) {
      if (signedUp.success === false) {
        setError(signedUp.message);
        navigate("/");
      } else {
        Cookies.set("token", signedUp.data.token as string);
        Cookies.set("user", JSON.stringify(signedUp.data.user));
        dispatch(
          setLogin({
            user: signedUp.data.user,
            token: signedUp.data.token,
          })
        );
        setError("");
        navigate("/home");
      }
    }
  };

  return (
    <Formik
      onSubmit={signupFormSubmit}
      initialValues={initialValuesSignUp}
      validationSchema={signupSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            {error && (
              <Typography color={"red"} mb={"20px"}>
                {error}
              </Typography>
            )}

            <Stack gap={"10px"}>
              <Dropzone
                multipleUpload={false}
                image={image}
                setImage={setImage}
              />
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <TextFields
                label="Repeat Your Password"
                name="confirmPassword"
                values={values.confirmPassword}
                errors={errors.confirmPassword!}
                touched={touched.confirmPassword!}
                handleChange={handleChange}
                handleBlur={handleBlur}
                type={showRePassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRePassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showRePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Stack direction={"row"} gap={"15px"}>
                <TextFields
                  label="First Name"
                  name="firstName"
                  values={values.firstName}
                  errors={errors.firstName!}
                  touched={touched.firstName!}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <TextFields
                  label="Last Name"
                  name="lastName"
                  values={values.lastName}
                  errors={errors.lastName!}
                  touched={touched.lastName!}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </Stack>

              <Stack>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    defaultChecked
                    name="gender"
                    value={values.gender}
                    onChange={(e) => {
                      setFieldValue("gender", e.target.value);
                    }}
                  >
                    <FormControlLabel
                      control={<Radio size="small" />}
                      label="Male"
                      value={"Male"}
                    />
                    <FormControlLabel
                      control={<Radio size="small" />}
                      label="Female"
                      value={"Female"}
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>

              <TextFields
                label="Address"
                name="location"
                values={values.location}
                errors={errors.location!}
                touched={touched.location!}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <TextFields
                label="Ocupation"
                name="occupation"
                values={values.occupation}
                errors={errors.occupation!}
                touched={touched.occupation!}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <TextFields
                label="Email"
                name="email"
                values={values.email}
                errors={errors.email!}
                touched={touched.email!}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <Button variant="contained" type="submit">
                Sign Up
              </Button>
            </Stack>
          </form>
        );
      }}
    </Formik>
  );
};

export default SignupForm;
