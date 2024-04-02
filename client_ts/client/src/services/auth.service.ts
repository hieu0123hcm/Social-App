import http from "../utils/http-common";

const login = (value: { username: string; password: string }) => {
  const response = http.post("/auth/login", value);
  return response;
};

const AuthService = {
  login,
};

export default AuthService;
