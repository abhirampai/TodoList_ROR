import axios from "axios";

const login = payload => axios.post("/sessions", payload);

const signout = () => axios.delete("/sessions");

const signup = payload => axios.post("/users", payload);

const authApi = {
  login,
  signout,
  signup
};

export default authApi;
