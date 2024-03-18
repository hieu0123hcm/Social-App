import { APIResponse } from "../../model/response.model";
import { User, UserResponse } from "../../model/user.model";

interface ISignupForm extends Omit<User, "_id" | "following" | "followers"> {
  password: string;
  picture: File[];
}

interface IProps {
  values: ISignupForm;
  picture: File[];
}

export async function register(props: IProps) {
  //TODO: separate the components into different files  & use Axios
  const formData = new FormData();

  if (props.values) {
    formData.append("picture", props.picture[0]);
  }

  formData.append("firstName", props.values.firstName);
  formData.append("lastName", props.values.lastName);
  formData.append("username", props.values.username);
  formData.append("email", props.values.email);
  formData.append("password", props.values.password);
  formData.append("location", props.values.location);
  formData.append("occupation", props.values.occupation);
  formData.append("picturePath", props.picture[0].name);
  formData.append("gender", props.values.gender);

  const signUpResponse = await fetch("http://localhost:5000/auth/register", {
    method: "POST",
    body: formData,
  });
  const signedUp: APIResponse<UserResponse> = await signUpResponse.json();

  return signedUp;
}
