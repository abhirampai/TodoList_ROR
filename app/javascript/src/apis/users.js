import axios from "axios";

const login = payload => axios.post("/sessions", payload);

const signout = () => axios.delete("/sessions");

const signup = payload => axios.post("/users", payload);

const list = () => axios.get("/users");

const authApi = {
  login,
  signout,
  signup,
  list
};

export default authApi;
